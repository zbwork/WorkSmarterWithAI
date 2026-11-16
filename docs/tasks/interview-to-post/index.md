---
title: 把访谈记录变成文章初稿
description: 先列提纲，再写初稿，留下受访者真正说过的话。
kind: guide
cost: 免费额度内
costNote: 先用免费额度
audience: 需要写文章的人
duration: 预计 5 分钟（不含登录）
order: 4
tags:
  - 新手
  - 工作提效
created: '2026-11-16'
updated: '2026-11-16'
sponsored: false
authors:
  - zbwork
platforms:
  doubao:
    level: 入门
    status: unverified
    verified: null
    version: null
    prerequisites: 会复制、粘贴和点击按钮
  codex:
    level: 进阶
    status: unverified
    verified: null
    version: null
    prerequisites: 会在项目目录中放置文件，并使用 Codex
scenarios:
  - scenario: media
    stage: writing
  - scenario: ai-app
    stage: discovery
methods:
  - type: skill
    use: interview-to-post
featured: true
---
# 把访谈记录变成文章初稿

<ArticleSummary />

手头有一段采访或聊天记录，却不知道怎么开头？先让 AI 帮你列三个要点，再写一篇短文。


::: platform doubao

## 1. 打开豆包，发这段练习

打开 [豆包网页版](https://www.doubao.com/chat/)，在“发消息”处粘贴下面这段话，点向上箭头发送。需要登录时按页面提示完成。

<PromptBox src="interview-to-post" part="提示词 1" />

![豆包真实输入框，图中展示了粘贴文字和发送按钮的位置](./images/doubao-input.webp)

## 2. 看完要点，再让它写

如果三个要点都来自原文，继续发：

<PromptBox src="interview-to-post" part="提示词 2" />

## 做完得到什么？

一篇短文初稿。检查有没有出现原文没有的故事、数字或引语，再把不自然的句子改成你自己的说法。

例如，原文只有“准备了 20 个问题”，如果它写成“20 位参与者”，就需要让它改回来。

## 换成自己的访谈

把练习记录换成你获得使用许可的访谈文字，先删掉电话等无关信息。文章比较长时，分几段发，并告诉它“我发完后再开始”。

:::

::: platform codex

在 Codex 中打开一个练习项目。这个流程只用对话，不需要安装技能。

<PromptBox src="interview-to-post" part="提示词 3" />

看完要点，再发：“按这三个要点写一篇 300 字以内、给第一次组织读书会的人看的短文。”检查有没有编造经历或数字。

这条操作路线尚未实测，待补截图：输入、提纲、短文结果。

:::

::: details 进阶玩法
把练习材料换成自己的文字，先用短段落试一次，检查没有漏掉关键信息后再处理长材料。
:::

::: details 给懂行的人
保留原始材料和修改后的回答，方便对照。每次换工具或模型，都重新检查人名、数字和未确定事项。
:::

## 检查一下

对照访谈原文，看有没有新增故事、数字或引语。“20 个问题”不能变成“20 位参与者”。

<PlatformTestTable />
