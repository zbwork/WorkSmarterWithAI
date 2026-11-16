# WorkSmarterWithAI 协作约定

- 本项目使用 VitePress 1.6 稳定版、Vue 3、Node 22.18+ 和 pnpm 10。
- 在 docs/ 下维护正文；设计资料在 design/，不作为发布正文。
- 分类取值唯一来源是 content.config.ts，不手工重复维护目录或前端 JSON。
- 未实测文章保持 status: unverified 和 verified: null；不要编造实测日期、版本、评分或客户案例。
- Skill、MCP、提示词包通过 format 区分，不声称未测试的平台兼容性。
- 实质修改更新 updated，重新实测更新 verified，纯排版变动不计内容更新。
- 新增教程使用 templates/ 模板；已停止维护文章保留 URL。
- 图片 WebP、宽度不超过 1600px、体积不超过 300KB，并有 alt。
- 下载包不包含密钥、真实客户信息或未经授权的第三方内容。
- 代码变动完成后运行 pnpm build。检查 SSR、根路径与 GitHub Pages 子路径。
- 不提交 node_modules、构建产物、artifacts 或本地环境配置。
