# 参与贡献

先读 [AGENTS.md](AGENTS.md) 和[评测规则](docs/review-policy/index.md)。

1. Fork 仓库，运行 `pnpm install`。
2. 使用 `pnpm new task your-slug --scenario office --stage meeting` 新建任务。也支持 lesson、skill、app、review；场景和环节以配置为准，不填参数时在终端选择。
3. 填好资源引用、正文和证据。未实测保持 unverified；评测实测后才能发布评分。`pnpm new` 生成的是待填写模板。
4. 运行 `pnpm build` 后提交 PR。排版调整不更新 updated，真实重测才更新 verified。
5. 投稿明确来源、授权，截图和下载包不含真实个人信息与密钥。

五维评分权重以 content.config.ts 为准。正文 CC BY 4.0，代码及原创资源 MIT，第三方保留原许可。

## 场景、环节和任务

- 归类先看读者的目标：已有岗位中的日常任务归职场；从零做成一件事、按环节推进的任务归项目实战；日常生活问题归生活。项目用“做成什么”命名，不用“AI + 行业”。导航组名及其对应的场景 group 只在 content.config.ts 的 scenarioGroups 维护。

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

## 按简洁版式写 Markdown

新手课和工作教程共用一套渲染，不需要单独开发页面。请先看 [Markdown 写作说明](templates/README.md)，选择 [单工具模板](templates/task.md)、[多工具模板](templates/task-multi-tool.md) 或 [新手课模板](templates/lesson.md)。多种做法连续写在 `::: platform <slug>` 段落中；网站自动生成简洁 Tab，只有一种做法时直接显示正文。工具实测记录默认折叠在文末。
