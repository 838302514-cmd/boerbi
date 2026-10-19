import { lessons } from './course.ts';
export type RecordItem = { lessonId:string; sectionIndex:number; attempts:number; correct:number; lastAnswer:number; updatedAt:number };
export type Practice = { lessonId:string; checked:number; updatedAt:number };
export type Progress = { records:RecordItem[]; practices:Practice[]; updatedAt:number; role:'learner'|'viewer' };
export function lessonPassed(id:string, records:RecordItem[]) { return lessons.find(l=>l.id===id)?.sections.every((_,i)=>records.some(r=>r.lessonId===id && r.sectionIndex===i && r.correct===1)) ?? false; }
export function summarize(progress:Progress) {
 const passed=lessons.filter(l=>lessonPassed(l.id,progress.records)).length;
 const practiced=progress.practices.filter(p=>p.checked===1).length;
 const completed=lessons.filter(l=>lessonPassed(l.id,progress.records)&&progress.practices.some(p=>p.lessonId===l.id&&p.checked===1)).length;
 const questions=progress.records.filter(r=>r.correct===1).length;
 const attempts=progress.records.reduce((n,r)=>n+r.attempts,0);
 return {passed,practiced,completed,questions,attempts,percent:Math.round(completed/lessons.length*100)};
}
export function chooseAnswer(lessonId:string,sectionIndex:number,answer:number) {
 const question=lessons.find(l=>l.id===lessonId)?.sections[sectionIndex]?.question;
 if(!question || !Number.isInteger(answer) || answer<0 || answer>=question.options.length) return null;
 return {correct:answer===question.answer, explanation:question.explanation};
}
export const blankProgress:Progress = {records:[],practices:[],updatedAt:0,role:'learner'};
