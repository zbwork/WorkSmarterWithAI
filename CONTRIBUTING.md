# 参与贡献

阅读 [网站贡献指南](docs/contribute/index.md) 与 [评测规则](docs/review-policy/index.md)。

1. Fork 仓库，运行 `pnpm install`。
2. 使用 `pnpm new skill guide example-slug` 新建文章；可选类型 skill/workflow/app，性质 guide/review/original。
3. 填写正文和元数据。未实测保持 unverified；评测必须提供测试记录后才可发布。
4. 运行 `pnpm build`，提交 PR。修正排版不更新 updated；实际重测才更新 verified。
5. 投稿明确来源与授权，截图、工作流中不含真实个人信息或密钥。

五维评分权重见 `content.config.ts`。总分需与权重计算一致。公开正文按 CC BY 4.0、代码与原创资源按 MIT 授权。

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
