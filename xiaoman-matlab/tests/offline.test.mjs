import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyProgress, recordAnswer, recordPractice, parseBackup, backupText, mergeProgress, readSaved, STORAGE_KEY } from '../offline/progress.ts';
import { summarize } from '../lib/study.ts';
import { reportHtml } from '../offline/report.ts';
test('offline progress survives serialization, correct answers remain mastered after a later mistake',()=>{
 let p=emptyProgress();p=recordAnswer(p,'hello',0,0,100).progress;p=recordAnswer(p,'hello',0,1,200).progress;p=recordAnswer(p,'hello',0,2,300).progress;
 assert.equal(p.records[0].correct,1);assert.equal(p.records[0].attempts,3);
 const stored=new Map([[STORAGE_KEY,backupText(p)]]);
 assert.deepEqual(readSaved({getItem:key=>stored.get(key)||null}),p);
 assert.equal(summarize(parseBackup(backupText(p))).questions,1);
});
test('imports merge without duplicating attempts and preserve mastery',()=>{
 let a=recordAnswer(emptyProgress(),'hello',0,1,100).progress;
 let b=recordAnswer(a,'hello',1,0,200).progress;b=recordPractice(b,'hello',true,300);
 assert.equal(summarize(b).completed,1);
 const merged=mergeProgress(a,b);assert.equal(summarize(merged).attempts,2);assert.deepEqual(mergeProgress(merged,b),merged);
 const later=recordPractice(merged,'hello',false,400);assert.equal(mergeProgress(later,b).practices[0].checked,0);
});
test('invalid imports are rejected and cannot overwrite valid state',()=>{
 const p=recordAnswer(emptyProgress(),'hello',0,1,100).progress;
 for(const text of ['bad','{}','null','[]',JSON.stringify({format:'other',version:1,progress:p})])assert.throws(()=>parseBackup(text));
 const data=JSON.parse(backupText(p));data.progress.records[0].lessonId='unknown';assert.throws(()=>parseBackup(JSON.stringify(data)));
 data.progress=p;data.progress.records=[p.records[0],p.records[0]];assert.throws(()=>parseBackup(JSON.stringify(data)));
 assert.throws(()=>parseBackup('x'.repeat(512001)));
 assert.throws(()=>recordAnswer(emptyProgress(),'hello',99,0));
});
test('family report is a standalone script-free snapshot with no external assets',()=>{
 const p=recordAnswer(emptyProgress(),'hello',0,1,100).progress,html=reportHtml(p);
 assert.ok(html.includes('1/36'));assert.ok(html.includes('认识你的两位学习搭档'));
 assert.ok(html.includes('不会自动更新'));assert.ok(html.includes('实操为学习者'));
 assert.doesNotMatch(html,/<script|<iframe|<link|src\s*=/i);
});
