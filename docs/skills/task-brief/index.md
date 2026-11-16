---
title: 让 AI 先问清楚你要什么
description: 先让 AI 问清楚，再动手，省得写完重来。
type: skill
kind: original
industry:
  - 通用
  - 新媒体
  - 行政人事
tools: []
cost: 免费额度内
costNote: 平台费用见各自官网
audience: 总觉得 AI 答非所问的人
time: 约 10 分钟（不含安装和登录）
order: 2
tags:
  - 新手
  - 工作提效
created: 2026-11-16
updated: 2026-11-16
sponsored: false
authors:
  - zbwork
format: skill
source: skills/task-brief
download: /downloads/task-brief.zip
license: MIT
platforms:
  doubao:
    level: 入门
    status: unverified
    verified: null
    version: null
    prerequisites: 会复制、粘贴和点击按钮
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
---
# 让 AI 先问清楚你要什么

<ArticleSummary />

你说“帮我写个通知”，AI 却不知道写给谁、通知什么。这份 <Term id="skill" /> 会先问清楚，再帮你写。

<PromptBox>

先问我三个最需要确认的问题，一次问一个。等我回答后再写草稿。没有确定的信息用“【待补】”，不要自己编造。

</PromptBox>

## 做完是什么样

先回答三个问题，再得到一段通知草稿。没确定的时间、地点和费用会留空。以下是使用步骤，技能导入和运行都还没有实测。

[下载技能包](/downloads/task-brief.zip)，解压后能看到 <Term id="skill-md" />。选你使用的平台，照着下面做。

::: platform doubao

### 导入技能

第一次导入？先看[豆包工作入门](/platforms/doubao/#怎么导入技能)。按那里依据官方文档整理的步骤，选择解压后的 task-brief 文件夹。

待补截图：导入位置、安装成功、运行结果。

### 试着用一次

新建工作任务，输入 / 或 @ 查找 task-brief，也可以从“更多技能”选择。然后发下面这段话。

<PromptBox>

请用 task-brief 帮我准备周末读书会通知。先问我三个最需要确认的问题，一次问一个。等我回答后，再写 150 字以内的微信群通知。没告诉你的时间、地点和费用先留空。

</PromptBox>

如果它直接写通知，补一句：“先问我问题，等我回答后再写。”

:::

::: platform workbuddy

### 导入技能

第一次导入？先看[WorkBuddy 入门](/platforms/workbuddy/#怎么导入技能)。按那里依据官方文档整理的步骤，上传 task-brief 技能包，在已安装列表确认是否出现 task-brief。

待补截图：上传技能、安装成功、运行结果。

### 试着用一次

在对话里说明要使用 task-brief，然后发送：

<PromptBox>

请使用 task-brief 帮我写周末读书会通知。先问我三个问题，一次问一个；回答完后，再写一段适合发在微信群的通知。时间、地点、费用没有确定的先留空。

</PromptBox>

:::

::: platform zhiban
:::

::: platform codex

### 在项目里放好文件

依据 [Codex 官方技能文档](https://developers.openai.com/codex/skills/)，把解压后的 task-brief 文件夹放到当前项目的 `.agents/skills/` 里，形成 `.agents/skills/task-brief/SKILL.md`。只改这个练习项目。

### 调用并检查

在这个项目中打开 Codex，使用技能选择入口，或在支持该输入方式的 CLI 中输入 `$task-brief`，再说：

<PromptBox>

使用 task-brief 帮我写周末读书会通知。先问我三个问题，一次问一个，回答完后再写 150 字以内的通知。没确定的信息留空。

</PromptBox>

检查它是否先提问、等你回答，再生成通知。这里尚未实际调用；待补截图：项目文件位置、技能调用、问答结果。

:::

::: details 进阶玩法
把读书会换成请假邮件、活动通知或自我介绍，复用先问后写的步骤。
:::

::: details 给懂行的人
技能入口是 SKILL.md，源文件在仓库 skills/task-brief。导入说明依据各平台官方文档；包结构是否被接受、调用是否成功，需要分别实测。
:::

<PlatformTestTable />
