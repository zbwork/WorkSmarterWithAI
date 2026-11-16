# WorkSmarterWithAI 协作约定

- 本项目使用 VitePress 1.6 稳定版、Vue 3、Node 22.18+ 和 pnpm 10。
- 在 docs/ 下维护正文；设计资料在 design/，不作为发布正文。
- 分类取值唯一来源是 content.config.ts，不手工重复维护目录或前端 JSON。
- 未实测文章保持 status: unverified 和 verified: null；不要编造实测日期、版本、评分或客户案例。
- Skill、MCP、提示词包通过 format 区分，不声称未测试的平台兼容性。
- 实质修改更新 updated，重新实测更新 verified，纯排版变动不计内容更新。
- 新增教程使用 templates/ 模板；已停止维护文章保留 URL。
- 图片 WebP、宽度不超过 1600px、体积不超过 300KB，并有 alt。
- 下载包不包含密钥、真实客户信息或未经授权的第三方内容。
- 代码变动完成后运行 pnpm build。检查 SSR、根路径与 GitHub Pages 子路径。
- 不提交 node_modules、构建产物、artifacts 或本地环境配置。

## 写给新手

- 用日常语言写明打开哪个工具、粘贴什么、点哪里、最后得到什么。
- 预计时间注明不含登录；没找真实新手计时，不写成已验证的完成时间。
- 标题最前，一行说明适合谁、用时和费用；源文件与试跑信息放文末。
- 使用 PromptBox 展示可复制的自然语言指令，避免用代码行号包装普通文字。
- 只展示已有内容的分类，不给空行业、空工具页放入口。
- 试跑附真实截图和失败/修正过程，不把示意图当作实际工具输出。

## v0.2 分类与平台

- 类型只用 Skill（技能）/ 工作流 / AI 应用，取值以 content.config.ts 为准。提示词归 skill + format: prompt；技能包用 format: skill；MCP 用 format: mcp。纯概念说明用 concept: true，不伪装成技能包。
- 入门：会打开页面、点按钮、拖文件、复制粘贴；进阶：会安装配置、管理项目文件或组合现成技能；高级：会命令行、写脚本或开发技能。按每个平台实际所需能力标 level，写清 prerequisites。
- 四个平台以 config 为唯一命名来源。format: skill 必须包含全部主平台记录与标签，至少两个平台 active 才进入默认列表；不足时是草稿，只在 catalog/?draft=1 列出，原网址仍可访问。
- active 必须有真实日期、具体版本/环境和对应平台标签内的真实截图；未测试用 unverified，待补步骤用 planned；unsupported 必须写原因。planned/unsupported 标签内不写步骤。
- 文章 difficulty/status/verified 由 platforms 派生，不要手工维护。普通聊天实测不能充当技能导入证据。每个平台超过 90 天独立提醒复测。
- 连续使用 `::: platform slug` 写平台标签，通用导入步骤放在 platforms/。新手区（非 Codex 标签、折叠块之前的正文）不出现命令行；命令只写在 Codex 或“给懂行的人”折叠块。
- 首次出现术语使用 `<Term id="skill" />`（其他 id 见 glossary.yml），解释用一句日常语言。平台名用 `<PlatformName slug="doubao" />`，组件不要硬编码分类名称。
- 测试记录放文末 `<PlatformTestTable />`。保留输入、版本、日期、次数、失败与修正过程；没有证据不写成功率。
- 图片存于文章的 images/，命名如 doubao-01-import.webp、codex-02-run.webp；不得使用设计图冒充截图。缺图明确写“待补截图”，列入 design/待实测清单.md。
- 提交前运行 pnpm check、pnpm build，核对根路径与 /WorkSmarterWithAI/ 子路径；桌面与 375px 检查首页、总览、技能页、平台页，以及偏好和 URL 覆盖。
