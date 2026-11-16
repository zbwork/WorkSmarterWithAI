# 参与贡献

阅读 [网站贡献指南](docs/contribute/index.md) 与 [评测规则](docs/review-policy/index.md)。

1. Fork 仓库，运行 `pnpm install`。
2. 使用 `pnpm new skill guide example-slug` 新建文章；可选类型 skill/workflow/app，性质 guide/review/original。
3. 填写正文和元数据。未实测保持 unverified；评测必须提供测试记录后才可发布。
4. 运行 `pnpm build`，提交 PR。修正排版不更新 updated；实际重测才更新 verified。
5. 投稿明确来源与授权，截图、工作流中不含真实个人信息或密钥。

五维评分权重见 `content.config.ts`。总分需与权重计算一致。公开正文按 CC BY 4.0、代码与原创资源按 MIT 授权。
