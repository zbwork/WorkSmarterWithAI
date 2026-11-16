---
title: 把商品评论分成喜欢和不满意
description: 把零散评论分成“喜欢什么”和“哪里不满意”。
kind: guide
cost: 免费额度内
costNote: 先用免费额度
audience: 需要看商品评论的人
duration: 预计 3 分钟（不含登录）
order: 5
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
scenarios:
  - scenario: commerce
    stage: reviews
  - scenario: ai-app
    stage: operations
methods:
  - type: skill
    use: review-feedback
featured: true
---
# 把商品评论分成喜欢和不满意

<ArticleSummary />

评论多了不好整理？先拿四条虚构评论练习，看看买家在说什么。


::: platform doubao

## 1. 打开豆包

打开 [豆包网页版](https://www.doubao.com/chat/)，找到“发消息”输入框。若需要登录，按页面提示完成。

## 2. 粘贴这四条评论

<PromptBox src="review-feedback" part="提示词 1" />

![豆包真实输入框：把上面整段文字粘贴进去，点击右下角箭头](./images/doubao-input.webp)

## 3. 看结果有没有漏掉

你可以用下面这张人工整理的对照表检查回答；它不是豆包的实测截图。

| 大家在说什么 | 喜欢还是不满意 | 评论编号 |
| --- | --- | --- |
| 颜色好看 | 喜欢 | ① |
| 杯盖难拧 | 不满意 | ①、③ |
| 下午水还是温的 | 喜欢 | ② |
| 包装完整 | 喜欢 | ③ |
| 快递盒破损 | 不满意 | ④ |

如果豆包直接说“快递员摔坏了盒子”，请补一句：“评论没有说是谁造成的，删掉这句猜测。”

## 换成自己的评论

先复制十来条练习，删掉昵称、电话、订单号，再加上编号。整理结果可以帮你找到值得继续看的问题；几条评论还不能代表所有买家。

:::



## 检查一下

检查有没有漏掉评论编号、有没有把原话意思改掉。一条评论可以属于多行，只写评论里提到的事，不猜原因。

<PlatformTestTable />
