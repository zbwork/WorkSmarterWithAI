---
title: Skill、MCP 和提示词包，分别用在哪里
description: 先分清三种能力扩展，再判断你的任务需要哪一种。
type: skill
kind: guide
industry: [通用, 开发]
tools: [Claude Code, Codex]
difficulty: 入门
cost: 按所用工具计费
tags: [任务拆解, 工作提效]
created: 2026-11-16
updated: 2026-11-16
verified: null
status: unverified
sponsored: false
authors: [AI 提效指南贡献者]
format: skill
---
# Skill、MCP 和提示词包，分别用在哪里

当你看到“给 AI 增加能力”的教程，先确认它提供的是指令、可加载的技能包，还是外部服务连接。

## 三者有什么区别

| 形式 | 主要作用 | 拿到文件后先看什么 |
| --- | --- | --- |
| 提示词包 | 提供可复用的任务指令 | 输入字段、输出要求、适用场景 |
| Agent Skill | 按约定组织说明与辅助资源 | 目标工具、支持版本、安装说明 |
| MCP 服务 | 提供工具或数据的协议接口 | 服务来源、权限范围、认证与运行方式 |

它们可以组合使用，但不能互相当作同一种安装包。

## 准备工作

先写下你需要的是“固定方法”“读取某类数据”还是“执行外部操作”。如果只是规范输出格式，一段清晰提示词就能作为起点。

## 操作步骤

1. 查看资源的原始仓库，确认目标工具和版本。
2. 阅读包内文件与使用说明，不直接执行不明安装命令。
3. 用非敏感样例运行一个最小任务。
4. 记录实际输入输出、版本和失败情况。

## 验收标准

资源能在目标工具里被正确识别；调用结果符合输入材料；不需要的外部权限没有被启用。具体兼容性以对应工具的官方说明与实测为准。

## 进一步阅读

[Agent Skills 规范](https://agentskills.io/specification) · [MCP 文档](https://modelcontextprotocol.io/docs/getting-started/intro)

## 相关推荐

[任务简报提示词包](/skills/task-brief/)
