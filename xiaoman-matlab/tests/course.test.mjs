import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, modules, taskPrompt } from '../lib/course.ts';
import { chooseAnswer, lessonPassed, summarize, blankProgress } from '../lib/study.ts';
test('18 unique lessons cover six stages and 36 complete checkpoints',()=>{
 assert.equal(lessons.length,18);assert.equal(new Set(lessons.map(l=>l.id)).size,18);assert.equal(modules.length,6);
 for(let m=0;m<6;m++)assert.equal(lessons.filter(l=>l.module===m).length,3);
 assert.equal(lessons.reduce((n,l)=>n+l.sections.length,0),36);
 for(const lesson of lessons){assert.ok(lesson.code.includes('assert('));assert.ok(lesson.expected);assert.equal(lesson.steps.length,3);for(const s of lesson.sections){assert.ok(s.body.length>45);assert.ok(s.question.hint);assert.ok(s.question.explanation);assert.ok(s.question.answer>=0&&s.question.answer<s.question.options.length);}}
});
test('grading accepts correct options, rejects wrong and malformed submissions',()=>{
 for(const l of lessons)for(const [i,s] of l.sections.entries()){
 assert.equal(chooseAnswer(l.id,i,s.question.answer).correct,true);
 assert.equal(chooseAnswer(l.id,i,(s.question.answer+1)%s.question.options.length).correct,false);
 }
 for(const value of [-1,3,NaN,0.5,'1',null])assert.equal(chooseAnswer('hello',0,value),null);
 assert.equal(chooseAnswer('unknown',0,0),null);
});
test('completion requires all quizzes and a separate practice self-report',()=>{
 assert.equal(lessonPassed('hello',[]),false);assert.equal(lessonPassed('missing',[]),false);
 const records=[0,1].map(i=>({lessonId:'hello',sectionIndex:i,attempts:2,correct:1,lastAnswer:0,updatedAt:100}));
 assert.equal(summarize({...blankProgress,records}).passed,1);assert.equal(summarize({...blankProgress,records}).completed,0);
 const result=summarize({...blankProgress,records,practices:[{lessonId:'hello',checked:1,updatedAt:100}]});
 assert.equal(result.completed,1);assert.equal(result.percent,6);assert.equal(result.attempts,4);
});
test('a full completed course reaches 100 percent and 36 passed checkpoints',()=>{
 const records=lessons.flatMap(l=>l.sections.map((_,i)=>({lessonId:l.id,sectionIndex:i,attempts:1,correct:1,lastAnswer:0,updatedAt:100})));
 const practices=lessons.map(l=>({lessonId:l.id,checked:1,updatedAt:100}));
 assert.deepEqual(summarize({...blankProgress,records,practices}),{passed:18,practiced:18,completed:18,questions:36,attempts:36,percent:100});
});
test('Codex handoff requires actual tools, verifies results and preserves existing files',()=>{
 for(const l of lessons){const prompt=taskPrompt(l);assert.ok(prompt.includes(l.code));assert.ok(prompt.includes(l.expected));assert.ok(prompt.includes('避免覆盖'));assert.ok(prompt.includes('不要声称已经运行'));}
});
