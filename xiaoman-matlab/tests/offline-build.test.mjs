import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const file=new URL('../offline-dist/index.html',import.meta.url);
test('offline distribution embeds its runtime and blocks remote connections', {skip:!existsSync(file)},()=>{
 const html=readFileSync(file,'utf8');
 assert.match(html,/connect-src 'none'/);
 assert.doesNotMatch(html,/<script[^>]+src\s*=|<iframe|@import|\/api\/study/i);
 assert.doesNotMatch(html,/<link[^>]+href=["']https?:/i);
 assert.doesNotMatch(html,/<(?:img|source)[^>]+src=["']https?:/i);
 assert.match(html,/离线版/);
 assert.match(html,/导出进度备份 JSON/);
 assert.match(html,/只读查看他人备份/);
});
