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
---
# 把会议记录变成待办表

<ArticleSummary />

复制几句会议记录，得到一张“谁做什么、什么时候做”的表。

下面的文字与任务页共用同一份源文件。

<PromptBox src="meeting-to-todo" part="提示词 1" />

<PromptBox src="meeting-to-todo" part="提示词 2" />

::: details 给懂行的人
prompt.md 保存任务里的原始提示词。各段分别完成输入、追问或修正，修改前请对照任务中的示例和检查步骤。
:::

## 原任务中的实测

[会议待办的输入、修正和完整记录](/tasks/meeting-actions/)

![豆包修正后的真实待办表，来自会议待办任务](/tasks/meeting-actions/images/doubao-corrected.webp)

<UsedIn />

<PlatformTestTable />
