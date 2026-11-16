<!-- README 草稿：{{ }} 里的内容上线前替换；<your-name> 换成 GitHub 用户名 -->

[![AI 提效指南](og.png)](https://<你的域名>)

# AI 提效指南

中文 | [English](README.en.md)

**{{作者名}} 著** · 持续更新的开源手册

**各行各业亲测好用的 Skill、工作流和 AI 应用。**

AI 工具每周都有新的，教程满天飞，真正坐下来用的时候却总卡在几个地方：装不上、不会配、配好了效果不如演示、用了一个月发现要付费。这本手册只写**真的用过、能跑通、讲得清花多少**的东西。

它按行业组织。法务、财务、电商、新媒体、设计、教育、开发、行政人事……先找到你的行业，再挑一两个现在就能用上的，其余的需要时再回来查。不用全看，这是一份备选单，不是学习计划。

每一篇都写明：**适合谁、要花多少钱和时间、最后一次实测的日期和工具版本**。超过 90 天没复测的会在页面上标出来。评测用统一的打分规则，有商业合作一律注明。作者自己做的 Skill 和工作流，源码和下载包都在这个仓库里，拿走就能用。

AI 工具变化很快，这里写的内容可能已经过时，也可能有错。价格、功能和使用条款以官方为准。发现写错了，欢迎[提 issue](https://github.com/<your-name>/WorkSmarterWithAI/issues/new/choose)。

**你会得到**：按行业整理的上手教程和实测评测、可直接下载的 Skill 和工作流文件、一个能按行业 / 工具 / 难度 / 花费筛选的总览页，以及一个让你的 AI 照这本手册回答问题的 Skill。

[在线阅读](https://<你的域名>) · [总览筛选](https://<你的域名>/catalog/) · [下载中心](https://<你的域名>/downloads/) · [最近更新](https://<你的域名>/changelog/) · [评测规则](https://<你的域名>/review-policy/) · [参与贡献](CONTRIBUTING.md) · 正文 [CC BY 4.0](LICENSE) · 代码 [MIT](LICENSE-CODE)

---

## 从这里开始

| 你是 | 先看这些 |
|---|---|
| 第一次用 AI 提效 | [{{入门：5 分钟选一个对话 AI}}](https://<你的域名>/apps/{{slug}}/) · [{{入门：第一个能省时间的工作流}}](https://<你的域名>/workflows/{{slug}}/) |
| 已经在用 Claude Code / Codex | [Skill 总览](https://<你的域名>/skills/) · [{{怎么装一个 Skill}}](https://<你的域名>/skills/{{slug}}/) |
| 想搭自动化流程 | [工作流总览](https://<你的域名>/workflows/) · [{{n8n / Dify / Coze 怎么选}}](https://<你的域名>/workflows/{{slug}}/) |
| 想直接看自己的行业 | [法律](https://<你的域名>/industries/法律/) · [财务](https://<你的域名>/industries/财务/) · [电商](https://<你的域名>/industries/电商/) · [新媒体](https://<你的域名>/industries/新媒体/) · [设计](https://<你的域名>/industries/设计/) · [教育](https://<你的域名>/industries/教育/) · [开发](https://<你的域名>/industries/开发/) · [更多 →](https://<你的域名>/industries/) |

## 内容分三类

| | 教程 | 评测 | 自研 |
|---|---|---|---|
| **Skill**：装进 Claude Code / Codex 等 AI 里的能力包、MCP、提示词包 | 怎么装、怎么用 | 同类横评、深度测评 | 作者写的 Skill，附下载 |
| **工作流**：n8n、Dify、Coze、ComfyUI 等平台上的自动化流程 | 一步步搭出来 | 不同平台和方案对比 | 作者搭的流程，附导出文件 |
| **AI 应用**：对话、写作、绘图、视频、语音、编程等独立产品 | 上手教程 | 产品测评、横评 | 作者开发的应用 |

## 每篇都写明这些

- **适合谁**：行业、岗位、难度（入门 / 进阶 / 高级）
- **花多少**：免费、低（每月 50 元以内）、中、高；价格写明截至哪天
- **实测日期和版本**：最后一次实际跑通的日期和工具版本，超过 90 天自动标出
- **评测分数**：效果、易用、稳定、成本、生态五项，规则公开在[评测规则](https://<你的域名>/review-policy/)
- **利益披露**：有没有商业合作，有就写在页面顶部

## 自研 Skill 和工作流

源码在 [`skills/`](skills/) 和 [`workflows/`](workflows/) 目录，每次改动后自动打包，发布在固定的 [Release](https://github.com/<your-name>/WorkSmarterWithAI/releases/tag/downloads-latest)，下载链接不变。

| 名称 | 类型 | 干什么 | 下载 |
|---|---|---|---|
| {{contract-review}} | Skill | {{把合同里的高风险条款挑出来，附修改建议}} | [zip](https://github.com/<your-name>/WorkSmarterWithAI/releases/download/downloads-latest/{{contract-review}}.zip) |
| {{…}} | 工作流 | {{…}} | {{…}} |

装一个 Skill（以 Claude Code 为例）：

```bash
# 下载后解压到项目或用户目录的 .claude/skills/ 下
unzip contract-review.zip -d ~/.claude/skills/
```

## 让 AI 照这本手册回答你

把 [`handbook-skill/`](handbook-skill/) 装进 Claude Code 或 Codex，然后直接问「我是做电商运营的，有什么 AI 能帮我写商品详情页」。它会先在手册里查，再回答，并注明出自哪一篇。

不装 Skill 也行：把 [`llms.txt`](https://<你的域名>/llms.txt) 的地址发给任意 AI，它就能读到整本手册。

## 参与贡献

- **纠错**：内容过时、步骤跑不通、价格变了，[提 issue](https://github.com/<your-name>/WorkSmarterWithAI/issues/new/choose) 选「内容纠错」或「工具已失效」
- **推荐**：你觉得好用的 Skill、工作流或应用，选「投稿推荐」
- **求评测**：想看哪两个产品比一比，选「求评测」
- **直接写**：按 [CONTRIBUTING.md](CONTRIBUTING.md) 用模板写好提 PR，CI 会检查格式和链接

## 许可证

- 正文：[CC BY 4.0](LICENSE)，转载请署名并附原文链接
- 代码和自研 Skill / 工作流：[MIT](LICENSE-CODE)

## 免责声明

本手册介绍的第三方工具与作者无隶属关系。工具的功能、价格和条款随时会变，以官方说明为准。使用 AI 处理合同、财务、医疗、个人信息等敏感内容前，请确认符合所在单位的规定和相关法律；涉及专业判断的，以专业人士意见为准。

---

如果这本手册帮你省了时间，点个 Star，让更多人看到。
