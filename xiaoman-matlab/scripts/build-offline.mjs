import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
// Reuse esbuild already pinned by the starter's drizzle-kit dependency. No new package is installed.
const require=createRequire(import.meta.url);
const kitRequire=createRequire(require.resolve('drizzle-kit'));
const {build}=kitRequire('esbuild');
const root=fileURLToPath(new URL('../',import.meta.url));
const kuromi=process.argv.includes('--kuromi');
const personalize=text=>kuromi?text.replaceAll('刘筱蔓','小勺子').replaceAll('筱蔓','小勺子').replaceAll('xiaoman-matlab-offline','xiaoshaozi-matlab-offline').replaceAll('吉伊卡哇','酷洛米'):text;
const out=path.join(root,kuromi?'offline-kuromi-dist':'offline-dist');mkdirSync(out,{recursive:true});
const result=await build({
 absWorkingDir:root,entryPoints:['offline/main.tsx'],bundle:true,write:false,format:'iife',platform:'browser',target:'es2020',jsx:'automatic',minify:true,charset:'utf8',
 define:{'process.env.NODE_ENV':'"production"'},
 plugins:[{name:'offline-lesson-view',setup(builder){
 if(kuromi)builder.onLoad({filter:/\.(tsx|ts)$/},args=>{
  if(args.path.includes('node_modules')||args.path.endsWith('lesson-view.tsx'))return;
  const source=args.path.endsWith(path.join('app','companions.tsx'))?readFileSync(path.join(root,'offline/kuromi-companions.tsx'),'utf8'):readFileSync(args.path,'utf8');
  let contents=personalize(source);
  if(args.path.endsWith(path.join('offline','app.tsx')))contents=contents.replace('角色风格的非官方同人绘制','主题的原创同人绘制');
  if(args.path.endsWith(path.join('offline','report.ts')))contents=contents.replaceAll('#fcfbf5','#fcf8ff').replaceAll('#435343','#493555').replaceAll('#648759','#8563a5').replaceAll('#859078','#8e759c').replaceAll('#faf0da','#f0e4f9').replaceAll('#e4e9da','#e4d5ee');
  return {contents,loader:'tsx',resolveDir:path.dirname(args.path)};
 });
 builder.onLoad({filter:/lesson-view\.tsx$/},args=>{
  let source=readFileSync(args.path,'utf8');
  const changes=[["from './academy'","from '../offline/ui'"],['本次作答已保存到云端。','本次作答已记入本机手账。请定期导出进度备份。'],['函数参考：','联网参考（可选）：']];
  for(const [before,after] of changes){if(!source.includes(before))throw new Error('Shared lesson view changed; review offline adaptation: '+before);source=source.replaceAll(before,after);}
  return {contents:personalize(source),loader:'tsx',resolveDir:path.dirname(args.path)};
 });}}]
});
const js=result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script');
const css=readFileSync(path.join(root,'app/globals.css'),'utf8').replace(/^@import[^;]*;\s*/,'')+`
.offline-view-banner{display:flex;align-items:center;gap:12px;background:#edf3e5;border:1px solid #dce5ce;border-radius:12px;padding:13px 17px;font-size:12px;color:#789166;margin-bottom:20px}.offline-view-banner .secondary{margin-left:auto}.offline-important{background:#faf1db;border:1px dashed #e5d9b6;color:#a18c5d;font-size:12px;padding:15px;border-radius:10px;margin-top:22px}@media(max-width:600px){.offline-view-banner{flex-wrap:wrap}.offline-view-banner .secondary{margin-left:0}.progress-actions{gap:10px}.progress-actions button{font-size:11px}.cloud-state{display:none}}
`+(kuromi?readFileSync(path.join(root,'offline/kuromi.css'),'utf8'):'');
if(/@import|url\(\s*['"]?https?:/i.test(css))throw new Error('External CSS resource in offline build');
const favicon=kuromi?'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#ede1f5"/><path d="m12 10 17 10h8l15-10-4 23q8 23-16 24Q8 56 15 33Z" fill="#302539"/><ellipse cx="32" cy="40" rx="17" ry="13" fill="#fffaff"/><circle cx="25" cy="40" r="2"/><circle cx="39" cy="40" r="2"/><circle cx="32" cy="24" r="5" fill="#ee9dc5"/></svg>':readFileSync(path.join(root,'public/favicon.svg'),'utf8');
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none';script-src 'unsafe-inline';style-src 'unsafe-inline';img-src data: blob:;font-src data:;connect-src 'none';object-src 'none';base-uri 'none'"><title>筱蔓的 MATLAB 探险手账 · 离线版</title><link rel="icon" href="data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}"><style>${css}</style></head><body><div id="root"><p style="padding:30px">正在打开离线学习手账…</p></div><noscript>请使用启用 JavaScript 的 Edge 或 Chrome 浏览器打开本文件。</noscript><script>${js}</script></body></html>`;
writeFileSync(path.join(out,'index.html'),personalize(html));
mkdirSync(path.join(out,'MATLAB练习'),{recursive:true});
for(const file of readdirSync(path.join(root,'matlab')))if(file.endsWith('.m')||file==='verification.csv')cpSync(path.join(root,'matlab',file),path.join(out,'MATLAB练习',file));
const instructions=`筱蔓的 MATLAB 探险手账 —— 离线学习包\n\n一、怎么打开\n1. 先将整个 ZIP 解压到固定文件夹，不要在压缩包预览或微信内直接学习。\n2. 双击 index.html，用 Microsoft Edge 或 Google Chrome 打开。无需安装 Node.js、无需代理、无需注册账号。\n3. 点击“开始第一课”，即可阅读、答题、使用互动实验。\n\n二、怎么保存进度\n同一浏览器、同一文件位置通常会自动保存进度；不要使用无痕模式。移动文件、换浏览器或清理浏览数据可能使记录不可见。\n每次学完请进入“学习进度与报告”→“导出进度备份 JSON”，把下载的文件另外保管。\n换电脑后，在新电脑打开本学习包，选择“导入备份并合并”。重复导入同一份备份不会重复累计次数。\n如果顶部提示无法自动保存，关闭页面前务必导出 JSON。\n\n三、怎样让家人查看\n选择“导出家人可读报告 HTML”，将下载的报告文件发给家人。家人保存后用浏览器打开即可，不需要安装学习包，也不需要访问码。\n报告是导出时的快照，不会自动更新。你也可以发 JSON，让家人在学习包中选择“只读查看他人备份”。\n\n四、MATLAB 和 Codex\n这个网站的课程、36 道理解题、4 个可视化实验均可离线使用，不会自动请求网络。\nMATLAB练习文件夹中有 18 个 .m 示例；也可以从每课下载。运行需要本机有 MATLAB 及有效许可。\n复制任务到 Codex 后，Codex 的在线服务仍需要联网；离线学习包不提供离线大模型或软件授权。\n实操勾选是学习者自查，不是网页自动验证 MATLAB。所有案例为教学合成数据。\n\n五、文件内容\nindex.html：独立的完整学习网站（可单独复制，但建议固定位置）\nMATLAB练习：课程脚本、全部示例验证脚本和验证结果\n先读我.txt：本说明\n\n离线版和原在线版记录独立，不能把在线学习码填在这里；离线版不需要学习码。\n源码：https://github.com/838302514-cmd/boerbi/tree/main/xiaoman-matlab\n视觉为《吉伊卡哇》角色风格的非官方同人绘制；与版权方无隶属关系。\n`;
writeFileSync(path.join(out,'先读我.txt'),'\ufeff'+personalize(instructions),'utf8');
console.log(JSON.stringify({output:out,htmlBytes:Buffer.byteLength(html),lessons:18,questions:36,externalRequestsRequired:0}));
