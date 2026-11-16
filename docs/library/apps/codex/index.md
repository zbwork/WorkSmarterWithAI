---
kind: guide
cost: 免费
created: '2026-11-16'
updated: '2026-11-16'
sponsored: false
authors:
  - zbwork
name: Codex
description: 编程工具：安装、登录与使用说明。
libraryType: app
app: codex
platforms:
  codex:
    level: 进阶
    status: unverified
    verified: null
    version: null
original: false
---
# <PlatformName slug="codex" /> 入门

面向已经会管理项目文件的读者。第一次用 AI，可以先完成[聊天练习](/start/first-message/)。

## 安装、登录与费用

从 [Codex 官网](https://openai.com/codex/)选择适合你的使用方式，并按官方指引登录。费用核对日期：2026-11-16；本页尚未实测，具体套餐和额度请以官网与账号显示为准。

## 在项目中放入技能

依据 [Codex 官方技能文档](https://developers.openai.com/codex/skills/)，可以在项目的 `.agents/skills/` 下放一个技能文件夹，文件夹里必须有 <Term id="skill-md" />。

例如：`.agents/skills/task-brief/SKILL.md`。先在练习项目中尝试，不需要修改全局配置。

## 调用与检查

在该项目里打开 Codex，通过技能选择入口调用；在支持这种输入方式的 CLI 中，也可以使用 `$技能名`。告诉它要做的任务，检查是否遵循技能的步骤。

**待补截图**：项目文件位置、技能选择入口、实际调用结果。本页只是依据官方文档整理，不是已完成的本地调用记录。


<UsedIn />

## 相关评测

目前没有已发布的评测。
