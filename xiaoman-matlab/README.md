# 筱蔓的 MATLAB 探险手账

为地球物理学大二、MATLAB 与编程零基础学习者设计的中文学习网站。

在线入口：https://xiaoman-matlab-field-notes.foamy-glade-7347.chatgpt.site

## 离线学习包（不需要代理）

下载仓库中的 [离线学习 ZIP](../downloads/xiaoman-matlab-offline.zip)，解压到固定文件夹，用 Edge 或 Chrome 打开 `index.html`。无需 Node.js、账号或服务器。包含 18 节课程、36 道即时判题、4 个互动实验和 MATLAB 脚本。

- 进度保存在本机浏览器；每次学完请导出 JSON 备份，换设备后可导入合并。
- 给家人发送导出的 HTML 报告即可查看进度。报告为导出时的快照，不自动同步；也支持只读查看离线 JSON。
- 请固定文件位置、使用同一浏览器，避免无痕模式。移动文件、清理浏览数据或更换浏览器后可用 JSON 恢复。
- 课程和实验不需要网络，包内不会自动请求外部资源。Codex 的在线服务仍需要联网，MATLAB 需本机有效安装及许可。实操勾选仅代表学习者自查。
- 离线版和在线版记录独立，离线版不使用在线学习码。

开发者安装已有依赖后运行 `pnpm build:offline`，输出 `offline-dist/`。构建复用锁文件中 drizzle-kit 已有的 esbuild，不添加生产依赖。HTML 内嵌全部脚本、样式与插图，并使用 `connect-src 'none'` 禁止页面网络请求。

## 第一次使用

1. 打开网址，在「连接我的学习手账」中创建一份手账。
2. 下载并保管访问码备份：`learn-` 学习码交给学习者；`view-` 只读码交给家人。两人不要分别新建手账。
3. 从第一课开始：阅读图解 → 完成每节两道理解检验 → 调节可视化参数 → 复制任务到已连接 MATLAB 的 Codex → 核对实际结果。
4. 在「学习进度」中查看统计、刷新云端记录、导出 JSON 报告。实操勾选是学习者自查，不是网站自动核验 MATLAB。

课程阅读与互动实验免登录。访问码是随机的持有者凭证，没有账号密码；不要把码发到公开仓库或公开链接里。服务器只存 SHA-256 摘要；丢失码且无浏览器备份时，不能通过姓名找回。退出手账会清除本机保存的码，云端记录保留。

## 课程与功能

- 六个阶段，18 节完整课程，36 道分节检验，每题有提示、解释与可重复作答记录。
- 工具准备 → 数组和画图 → 测量数据处理 → 拟合与误差 → 优化与反演 → 波形仿真与综合实践。
- 四个 SVG 互动实验：正弦波、地温直线拟合、移动平均、指数衰减。
- 所有工程例子为教学合成数据，不把简化模型当作真实地层结论。
- 每课提供可下载的 `.m` 文件、具体操作步骤、预期数值、assert 校验和 Codex 实操任务。
- 数据保存在 Cloudflare D1，访问码支持跨设备读取；只读权限在服务端强制执行。
- 响应式布局、中文无障碍标签、键盘操作、减少动态效果偏好支持。
- 手绘 SVG 采用《吉伊卡哇》角色风格，为非官方同人学习项目，未复制官方插画文件；角色相关权利归原权利人。项目与 MathWorks、OpenAI 及角色版权方无隶属关系。

## 本地开发

使用 Node.js 24+ 和 pnpm 11.25.0：

```sh
pnpm install --frozen-lockfile
npm test
pnpm exec tsc --noEmit
pnpm build
```

项目保留 Sites 标准 Vinext/Cloudflare 构建集成；本机预览需要初始化本地 D1：

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_glossy_killmonger.sql
pnpm start -- --port 5187
```

第二个终端对运行中的本地预览执行完整接口检查：

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:5187'
npm test
```

无 TEST_BASE_URL 时跳过在线接口测试，其余课程和判题逻辑测试仍运行。`pnpm dev` 提供开发预览；本地数据库与线上数据库分离。D1 架构变更需要 `pnpm db:generate`，不能在请求处理中临时建表。

## MATLAB 示例验证

`matlab/` 中提供 18 个示例以及 `verify_all_lessons.m`。本项目在 2026-10-19 通过本机 MATLAB MCP 运行全部示例，18/18 通过内置 assert，结果见 `matlab/verification.csv`。验证过程生成的图片和中间表格不进入源码仓库。

重新导出网站内的课程示例：

```sh
node scripts/export-lessons.mjs
```

在 MATLAB 中运行 `matlab/verify_all_lessons.m` 可复验。依赖基础 MATLAB 函数，不要求 Optimization Toolbox 或 Signal Processing Toolbox。MATLAB 软件与本地 MCP 配置由各学习者自己的环境提供，网站本身不执行 MATLAB。

## 核心目录

- `lib/course.ts`：18 节课程、36 道题、参考代码与任务卡。
- `lib/study.ts`：完成度与服务端判题逻辑。
- `app/academy.tsx`：学习手账、课程地图、访问码与进度页面。
- `app/lesson-view.tsx`、`app/lab.tsx`：分节教学与互动实验。
- `app/api/study/route.ts`：创建手账、读写进度、只读权限与请求校验。
- `db/schema.ts`、`drizzle/`：数据库定义与不可变迁移。
- `.openai/hosting.json`：Sites 部署配置，不含访问码或密钥。
- `tests/`：课程完整性、判题逻辑、完成度和实际接口集成测试。

## 隐私与边界

不收集姓名、邮箱、手机号或真实工程文件；数据库保存匿名手账标识、访问码摘要、答题与实操自查记录及活动时间。访问码只经 Authorization 请求头传递，不放入网址。代码公开不等于学习记录公开。

网站不内置 AI 聊天或付费 API；即时反馈来自预设的教学解释与服务端判题。实际 MATLAB 运行结果由学习者在 Codex 中检查。真实工程问题需进一步验证模型、单位、数据质量和不确定性。

本仓库源代码是在线网站的可维护备份；仅启用 GitHub Pages 无法运行 D1/API。线上服务由 Sites 托管，迁移部署需另行准备兼容的 Cloudflare 环境。

## 官方参考

- https://www.mathworks.com/help/matlab/getting-started-with-matlab.html
- https://www.mathworks.com/help/matlab/ref/polyfit.html
- https://www.mathworks.com/help/matlab/ref/fminsearch.html
- https://www.mathworks.com/help/matlab/ref/fft.html
- https://github.com/matlab/matlab-mcp-server
- https://learn.chatgpt.com/docs/extend/mcp
