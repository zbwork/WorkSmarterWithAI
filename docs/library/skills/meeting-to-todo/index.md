---
kind: guide
cost: 免费
created: '2026-11-16'
updated: '2026-11-16'
sponsored: false
authors:
  - zbwork
name: 把会议记录变成待办表
description: 复制几句会议记录，得到一张“谁做什么、什么时候做”的表。
libraryType: skill
format: prompt
original: true
source: skills/meeting-to-todo
download: /downloads/meeting-to-todo.zip
license: MIT
platforms:
  doubao:
    level: 入门
    status: active
    verified: '2026-11-16'
    version: 豆包网页版，对话 / 快速入口，页面未显示模型版本
    prerequisites: 会复制、粘贴和点击按钮
    runs: 1
    model: 页面未显示
    input: 文中虚构练习材料
    notes: 一次完整输入，追加一次修正，详见上方记录
resourceDescription: 提取待办事项、负责人和完成时间。
sidebar: false
pageClass: library-resource
resourceTitle: 会议待办整理
---

<ResourceHeader />

## 如何使用

复制下面的提示词，粘贴到 AI 对话框。先用示例试一下，再换成自己的材料。

## 提示词

<PromptBox src="meeting-to-todo" part="提示词 1" copy-label="复制提示词" />

::: details 后续追问与修正

<PromptBox src="meeting-to-todo" part="提示词 2" copy-label="复制提示词" />

:::

使用结果前，请核对负责人和时间。

<UsedIn />

::: details 查看原任务中的真实截图

[会议待办的输入、修正和完整记录](/tasks/meeting-actions/)

![豆包修正后的真实待办表，来自会议待办任务](/tasks/meeting-actions/images/doubao-corrected.webp)

:::

<PlatformTestTable />
