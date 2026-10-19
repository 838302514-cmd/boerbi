import { lessons } from '../lib/course.ts';
import { blankProgress, chooseAnswer, type Progress } from '../lib/study.ts';
export const STORAGE_KEY = 'xiaoman-matlab-offline-v1';
export const FORMAT = 'xiaoman-matlab-offline';
const validTime = (v:unknown):v is number => typeof v==='number' && Number.isFinite(v) && v>=0 && v<=4102444800000;
export function validateProgress(input:unknown):Progress {
 if(!input || typeof input!=='object') throw new Error('备份中没有有效的进度记录。');
 const p=input as Progress;
 if(!Array.isArray(p.records)||p.records.length>36||!Array.isArray(p.practices)||p.practices.length>18||!validTime(p.updatedAt)) throw new Error('进度记录格式或数量不正确。');
 const seen=new Set<string>();
 const records=p.records.map(r=>{
  if(!r||!Number.isInteger(r.sectionIndex)||!chooseAnswer(r.lessonId,r.sectionIndex,r.lastAnswer)||!Number.isInteger(r.attempts)||r.attempts<1||r.attempts>100000||![0,1].includes(r.correct)||!validTime(r.updatedAt)) throw new Error('备份含有无效的答题记录。');
  const id=r.lessonId+':'+r.sectionIndex;if(seen.has(id))throw new Error('备份含有重复题目。');seen.add(id);
  return {lessonId:r.lessonId,sectionIndex:r.sectionIndex,attempts:r.attempts,correct:r.correct,lastAnswer:r.lastAnswer,updatedAt:r.updatedAt};
 });
 seen.clear();
 const practices=p.practices.map(r=>{
  if(!r||!lessons.some(l=>l.id===r.lessonId)||![0,1].includes(r.checked)||!validTime(r.updatedAt)||seen.has(r.lessonId)) throw new Error('备份含有无效的实操记录。');
  seen.add(r.lessonId);return {lessonId:r.lessonId,checked:r.checked,updatedAt:r.updatedAt};
 });
 return {records,practices,updatedAt:p.updatedAt,role:'learner'};
}
export function parseBackup(text:string):Progress {
 if(text.length>512000)throw new Error('文件过大，请选择本网站导出的进度 JSON。');
 let data:any;try{data=JSON.parse(text);}catch{throw new Error('不是有效的 JSON 文件，请选择导出的进度备份。');}
 if(data?.format!==FORMAT||data?.version!==1)throw new Error('不是此离线版的进度备份。请选择“导出进度备份”生成的 JSON。');
 return validateProgress(data.progress);
}
export function backupText(progress:Progress) {return JSON.stringify({format:FORMAT,version:1,exportedAt:new Date().toISOString(),progress:validateProgress(progress)},null,2);}
export function emptyProgress():Progress{return structuredClone(blankProgress);}
export function recordAnswer(p:Progress,lessonId:string,sectionIndex:number,answer:number,now=Date.now()) {
 const result=chooseAnswer(lessonId,sectionIndex,answer);if(!result)throw new Error('题目或答案无效。');
 const old=p.records.find(r=>r.lessonId===lessonId&&r.sectionIndex===sectionIndex);
 const record={lessonId,sectionIndex,lastAnswer:answer,attempts:(old?.attempts??0)+1,correct:Math.max(old?.correct??0,result.correct?1:0),updatedAt:now};
 return {result,progress:{...p,role:'learner' as const,updatedAt:now,records:[...p.records.filter(r=>r!==old),record]}};
}
export function recordPractice(p:Progress,lessonId:string,checked:boolean,now=Date.now()):Progress {
 if(!lessons.some(l=>l.id===lessonId)||typeof checked!=='boolean')throw new Error('实操记录无效。');
 return {...p,role:'learner',updatedAt:now,practices:[...p.practices.filter(r=>r.lessonId!==lessonId),{lessonId,checked:checked?1:0,updatedAt:now}]};
}
export function mergeProgress(current:Progress,incoming:Progress):Progress {
 const a=validateProgress(current),b=validateProgress(incoming);
 const records=new Map(a.records.map(r=>[r.lessonId+':'+r.sectionIndex,r]));
 for(const r of b.records){const k=r.lessonId+':'+r.sectionIndex,old=records.get(k);records.set(k,old?{...(r.updatedAt>old.updatedAt?r:old),correct:Math.max(old.correct,r.correct),attempts:Math.max(old.attempts,r.attempts)}:r);}
 const practices=new Map(a.practices.map(r=>[r.lessonId,r]));
 for(const r of b.practices){const old=practices.get(r.lessonId);if(!old||r.updatedAt>old.updatedAt)practices.set(r.lessonId,r);}
 return {records:[...records.values()],practices:[...practices.values()],updatedAt:Math.max(a.updatedAt,b.updatedAt),role:'learner'};
}
export function readSaved(storage:Pick<Storage,'getItem'>) {const raw=storage.getItem(STORAGE_KEY);return raw?parseBackup(raw):emptyProgress();}
