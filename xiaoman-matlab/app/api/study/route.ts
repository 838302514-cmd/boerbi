import { env } from 'cloudflare:workers';
import { lessons } from '../../../lib/course';
import { chooseAnswer } from '../../../lib/study';
export const dynamic = 'force-dynamic';
function response(body:unknown,status=200) { return Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}}); }
async function hash(value:string) { const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)); return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join(''); }
function key(prefix:string) { const bytes=crypto.getRandomValues(new Uint8Array(24)); return prefix+'-'+Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join(''); }
async function auth(request:Request) {
 const token=request.headers.get('Authorization')?.replace(/^Bearer /,'')??'';
 if(!/^(learn|view)-[0-9a-f]{48}$/.test(token)) return null;
 const h=await hash(token); const db=env.DB!;
 const row=await db.prepare('SELECT id, learner_hash, updated_at FROM learners WHERE learner_hash=? OR viewer_hash=?').bind(h,h).first<{id:string;learner_hash:string;updated_at:number}>();
 return row ? {id:row.id,role:row.learner_hash===h?'learner':'viewer',updatedAt:row.updated_at} : null;
}
function sameOrigin(request:Request) { const origin=request.headers.get('Origin'); return !origin || origin===new URL(request.url).origin; }
export async function GET(request:Request) {
 try {
 if(!env.DB) return response({error:'在线存储暂时不可用，请稍后重试。'},503);
 const user=await auth(request); if(!user) return response({error:'访问码无效，请检查是否完整复制。'},401);
 const [a,p]=await Promise.all([
 env.DB.prepare('SELECT lesson_id AS lessonId, section_index AS sectionIndex, attempts, correct, last_answer AS lastAnswer, updated_at AS updatedAt FROM answers WHERE learner_id=?').bind(user.id).all(),
 env.DB.prepare('SELECT lesson_id AS lessonId, checked, updated_at AS updatedAt FROM practices WHERE learner_id=?').bind(user.id).all()]);
 return response({records:a.results,practices:p.results,updatedAt:user.updatedAt,role:user.role});
 } catch { return response({error:'暂时无法读取进度，请稍后重试。'},503); }
}
export async function POST(request:Request) {
 try {
 if(!sameOrigin(request)) return response({error:'请求来源无效。'},403);
 if(!env.DB) return response({error:'在线存储暂时不可用，请稍后重试。'},503);
 const raw=await request.text(); if(raw.length>4096) return response({error:'请求过长。'},413);
 let data:any;try{data=JSON.parse(raw);}catch{return response({error:'请求格式错误。'},400);}
 if(!data || typeof data!=='object') return response({error:'请求格式错误。'},400);
 const now=Date.now();
 if(data.action==='create') {
 const learnerCode=key('learn'),viewerCode=key('view');
 await env.DB.prepare('INSERT INTO learners(id,learner_hash,viewer_hash,created_at,updated_at) VALUES(?,?,?,?,?)').bind(crypto.randomUUID(),await hash(learnerCode),await hash(viewerCode),now,now).run();
 return response({learnerCode,viewerCode},201);
 }
 const user=await auth(request); if(!user) return response({error:'访问码无效或未连接。'},401);
 if(user.role!=='learner') return response({error:'只读查看码不能提交答案或修改进度。'},403);
 const lesson=lessons.find(l=>l.id===data.lessonId); if(!lesson) return response({error:'找不到这一课。'},400);
 if(data.action==='answer') {
 if(!Number.isInteger(data.sectionIndex)) return response({error:'题目编号无效。'},400);
 const result=chooseAnswer(lesson.id,data.sectionIndex,data.answer); if(!result) return response({error:'答案格式无效。'},400);
 await env.DB.batch([
 env.DB.prepare('INSERT INTO answers(learner_id,lesson_id,section_index,attempts,correct,last_answer,updated_at) VALUES(?,?,?,1,?,?,?) ON CONFLICT(learner_id,lesson_id,section_index) DO UPDATE SET attempts=attempts+1,correct=MAX(correct,excluded.correct),last_answer=excluded.last_answer,updated_at=excluded.updated_at').bind(user.id,lesson.id,data.sectionIndex,result.correct?1:0,data.answer,now),
 env.DB.prepare('UPDATE learners SET updated_at=? WHERE id=?').bind(now,user.id)]);
 return response(result);
 }
 if(data.action==='practice') {
 if(typeof data.checked!=='boolean') return response({error:'实操状态无效。'},400);
 // Completion is explicitly a learner's self-report, not proof of MATLAB execution.
 await env.DB.batch([
 env.DB.prepare('INSERT INTO practices(learner_id,lesson_id,checked,updated_at) VALUES(?,?,?,?) ON CONFLICT(learner_id,lesson_id) DO UPDATE SET checked=excluded.checked,updated_at=excluded.updated_at').bind(user.id,lesson.id,data.checked?1:0,now),
 env.DB.prepare('UPDATE learners SET updated_at=? WHERE id=?').bind(now,user.id)]);
 return response({ok:true});
 }
 return response({error:'不支持的操作。'},400);
 } catch { return response({error:'暂时无法保存，请保持页面并重试。'},503); }
}
