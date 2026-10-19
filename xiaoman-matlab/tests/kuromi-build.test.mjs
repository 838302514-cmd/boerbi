import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
const folder=new URL('../offline-kuromi-dist/',import.meta.url);
test('Kuromi offline variant has independent branding, storage and embedded illustrations', {skip:!existsSync(folder)},()=>{
 const html=readFileSync(new URL('index.html',folder),'utf8');
 assert.ok(html.includes('小勺子'));
 assert.ok(html.includes('酷洛米学习伙伴'));
 assert.ok(html.includes('xiaoshaozi-matlab-offline-v1'));
 assert.ok(!html.includes('筱蔓'));
 assert.ok(!html.includes('吉伊卡哇'));
 assert.ok(!html.includes('xiaoman-matlab-offline'));
 assert.ok(html.includes("connect-src 'none'"));
 assert.doesNotMatch(html,/<script[^>]+src\s*=|<iframe|@import|\/api\/study/i);
 for(const file of readdirSync(new URL('MATLAB练习/',folder))){
  assert.equal(readFileSync(new URL('MATLAB练习/'+file,folder),'utf8'),readFileSync(new URL('../matlab/'+file,import.meta.url),'utf8'));
 }
 assert.ok(!readFileSync(new URL('先读我.txt',folder),'utf8').includes('筱蔓'));
});
