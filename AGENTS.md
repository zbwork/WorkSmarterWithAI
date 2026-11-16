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

## 场景、环节和任务

- 分类、环节、工具、级别和做法名称只在 content.config.ts 定义。新任务先选场景和环节；第一项是主场景，同一任务可属于多个场景，正文只维护一份。
- 任务放 docs/tasks/<slug>/；基础课放 docs/start/<slug>/，按 lesson 排序；资源放 docs/library/skills|workflows|apps/<id>/；独立评测放 docs/reviews/。
- 标题从事情出发，如“把会议记录变成待办表”。每篇任务必须写“检查一下”，明确人名、数字、日期或引用要核对什么。
- methods 第一项为推荐做法，用 type（skill/workflow/app）和 use 引用技能库。其他做法必须说明 note、level、status。提示词 format: prompt；技能包 format: skill；MCP format: mcp。
- 技能库用 UsedIn 自动反查任务；AI 应用还按任务的 platforms 记录反查使用关系。草稿不计入已发布任务。
- 生活类优先用手机截图、讲语音输入、一步一件事，正文不小于 16px，可点区域足够大。健康、法律、财务任务在“检查一下”说明 AI 只供参考，以相关专业人员意见为准。

## 工具与证据

- 工具唯一来源为 apps。doubao 表示普通聊天，doubao-work 表示豆包工作。普通聊天实测不能证明技能导入成功。
- 推荐做法为技能包的任务，必须包含所有 skills: true 工具的记录和标签；至少 1 个 active 才公开列出，否则保留为草稿，可通过 /search/?draft=1 查看。
- 知办能力待确认：skills: null，skillCandidate: true，仅保留 planned 标签，不建立应用条目，不宣称支持导入。确认能力后再调整配置。
- frontmatter 保留 platforms；正文连续使用 ::: platform slug。读者界面统一叫“工具”。URL ?platform= 优先于跨文章偏好，再按配置顺序选择。
- active 必须有真实 verified、version 和该工具的真实截图；unverified 不填实测日期；planned/unsupported 不写步骤，unsupported 必须说明原因。每个工具超过 90 天独立提醒复测。
- 文章难度、状态、最近实测日期由工具记录派生。推荐做法的最低工具级别用于列表；筛选工具与级别时必须匹配同一个工具。
- 通用导入步骤在技能库 AI 应用条目维护，任务只写这件事特有的操作。新手区（非 Codex 标签、折叠块之前）不出现命令行。
- PromptBox 支持 src="资源目录名" part="prompt.md 的二级标题"，与 skills/<id>/prompt.md 共用原文，保留 slot 用法；不要在多处复制维护同一提示词。
- 测试记录放文末 PlatformTestTable，保留失败、修正、版本、日期、输入与次数，不编成功率。价格写明查阅日期。
- 图片随文章存 images/，工具-步骤命名；WebP、≤1600px、≤300KB、alt 必填。打码账号、电话、客户资料，不用设计图冒充截图。
- 首页、侧栏、场景页只列已有已发布任务的分类；技能库可公开未验证资源并明确状态。跳转页不进搜索、站点地图和 llms。
- 提交前 pnpm check 与 pnpm build；检查根路径、/WorkSmarterWithAI/ 子路径、桌面与 375px、旧链接、搜索及工具偏好。
