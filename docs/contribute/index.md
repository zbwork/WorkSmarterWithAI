---
title: 参与贡献
---
# 一起把手册写得更有用

欢迎纠错、推荐工具、提交实际测试记录，以及分享可复用的工作方法。

## 提交问题

[内容纠错、投稿推荐、求评测或工具失效](https://github.com/zbwork/WorkSmarterWithAI/issues/new/choose)。告诉我们是哪篇、卡在哪一步，最好附一张不含个人信息的截图。

## 新手检查

请找一位还没用过 AI 的人，只看教程操作，记录用时和卡住的步骤。第一课目标是 3 分钟内完成，不含注册登录；没达到就继续改，不把估计用时写成实测。

::: details 给懂行的人：写文章与提交检查

## 写一篇文章

```bash
pnpm new task your-slug --scenario office --stage meeting
pnpm dev
```

新文件生成在 `docs/tasks/your-slug/index.md`。先把对应工具保留为 `status: unverified`，完成测试后再填写该工具的 `verified`、`version` 和真实截图。文章状态和级别自动计算。

- 一篇文章一个目录，图片放在同目录 `images/` 下。
- 标题讲任务，正文先说做完得到什么，再写操作步骤。
- 场景、环节、工具等取值在根目录 `content.config.ts` 中统一维护。
- 评测须有五维分数、用例和测试记录；无法验证的内容不写成亲测。
- 原创包必须带许可证和使用说明；第三方代码保留原许可证。

## 提交前检查

```bash
pnpm check
pnpm build
```

检查包括字段、日期、内部链接、图片和常见密钥模式。外部链接检查可运行 `pnpm check:links`；网络限制导致的错误需人工核对。

:::

## 图片与视频

图片使用 WebP，宽度不超过 1600px，大小不超过 300KB，并写明 alt。`pnpm img 图片路径` 会在原文件旁输出 WebP，不删除原图，确认效果后再修改正文引用。

长视频可用 `VideoEmbed` 嵌入 B 站或 YouTube，点击后才加载播放器；短演示用 `Clip` 引用外部存储。截图与导出文件先移除账号、客户信息和密钥。

## 合并与署名

在文章的 `authors` 字段填写署名。提交 Pull Request 后运行自动检查；维护者审核内容、授权和复现记录后合并。提交内容默认按项目对应的正文或代码许可证授权。

## 提交工具实测

使用[工具实测投稿](https://github.com/zbwork/WorkSmarterWithAI/issues/new?template=tool-test.yml)，写清文章、工具、版本、日期和结果。技能包需要至少一个工具实测通过才进入默认列表。
