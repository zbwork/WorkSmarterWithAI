---
kind: guide
cost: 免费
created: '2026-11-16'
updated: '2026-11-16'
sponsored: false
authors:
  - zbwork
name: 让 AI 先问清楚你要什么
description: 先让 AI 问清楚，再动手，省得写完重来。
libraryType: skill
format: skill
original: true
source: skills/task-brief
download: /downloads/task-brief.zip
license: MIT
platforms:
  workbuddy:
    level: 入门
    status: unverified
    verified: null
    version: null
    prerequisites: 会复制、粘贴和点击按钮
  zhiban:
    level: 入门
    status: planned
    verified: null
    version: null
    prerequisites: 会复制、粘贴和点击按钮
  codex:
    level: 进阶
    status: unverified
    verified: null
    version: null
    prerequisites: 会在项目目录中放置文件，并使用 Codex
  doubao-work:
    level: 入门
    status: unverified
    verified: null
    version: null
    prerequisites: 会复制、粘贴和点击按钮
resourceDescription: 先补齐目标与限制，再整理任务说明。
sidebar: false
pageClass: library-resource
resourceTitle: 需求澄清
---

<ResourceHeader />

## 如何使用

下载并解压技能包，阅读其中的 SKILL.md，再按所用工具的说明导入。导入和调用尚未实测，使用前请自行核对。

## 获取技能

<Download file="/downloads/task-brief.zip" />

## 技能说明书

::: details 查看 SKILL.md

```markdown
---
name: task-brief
description: 先逐个询问三个关键问题，再根据用户回答起草通知、邮件或短文。适用于需求还不清楚、希望先确认再写的任务。
---

# 先问清楚，再动手

1. 阅读用户想做的事，找出最影响结果的三个缺失信息，例如给谁看、时间地点、希望读者做什么。
2. 一次只问一个问题，等用户回答后再问下一个。用户已经说明的信息不重复问。
3. 用户说还没确定，就记录为“待确认”；不代替用户编造。
4. 三个问题问完，用一句话确认要做什么，再按用户要求的形式和长度写草稿。
5. 草稿中的未知时间、地点、费用使用“【待补】”，最后列出还需补充的内容。
6. 用户要求修改时，保留已确认的信息，只调整指定部分。

## 练习

用户想写周末读书会通知：先问参加对象，再问时间地点，再问报名方式或费用；回答完后生成 150 字以内微信群通知。

```

:::

::: details 补充说明
SKILL.md 先询问缺少的信息，再整理任务要求；不知道的内容留空。提示词文件提供可复制的对话版本。普通聊天与技能导入需要分别验证。
:::

<UsedIn />

<PlatformTestTable />
