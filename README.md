# AI 提效指南 · WorkSmarterWithAI

新手跟着做就会，懂行的人也有干货。先按工作或生活场景找到任务，再选自己的 AI 工具跟着做。开源、持续更新。

[搜索与全部内容](https://zbwork.github.io/WorkSmarterWithAI/search/) · [在线阅读](https://zbwork.github.io/WorkSmarterWithAI/) · [参与贡献](CONTRIBUTING.md) · [设计文档](design/设计文档.md)

现有 6 篇迁移为 2 节新手课、4 篇任务，新增 8 个技能库条目。已发布任务覆盖职场通用、行政人事、新媒体运营、电商运营和 AI 应用开发。task-brief 技能包任务仍为草稿，等待至少一个工具实测通过。会议待办和第一条消息保留原有豆包真实截图；未新增实测结论。

## 本地运行

需要 Node.js 22.18+（推荐 Node 22 LTS）和 pnpm 10。

```bash
pnpm install
pnpm dev
```

## 维护内容

```bash
pnpm new task your-slug --scenario office --stage meeting   # 新建文章
pnpm img path/to/image.png       # 生成 WebP，保留原文件
pnpm check                      # 字段、链接、图片、密钥模式与回归检查
pnpm check:links                # 包含外部链接的网络检查
pnpm check:stale                # 复测清单
pnpm build                      # 生成资源与生产站点
pnpm preview                    # 预览构建结果
```

- 正文在 `docs/tasks/`、`docs/start/`、`docs/library/`、`docs/reviews/`，每篇一个文件夹。
- 分类、署名、仓库地址在 `content.config.ts`。
- 教程、评测、自研模板在 `templates/`。
- 自研资源在 `skills/`、`workflows/`；手册查询 Skill 在 `handbook-skill/`。
- 工具级 `verified` 只写真实实测日期；未测试工具用 `status: unverified`。文章状态、最低级别与最新实测日期自动派生。
- 发布评测前必须填写用例、版本、实测日期、五维分数与利益披露。

## 已实现

VitePress 文档阅读、中文全文搜索、自动侧边栏、组合筛选与 URL 分享、场景页与技能库、实测状态和过期提示、Markdown 原文与复制、更新记录、下载打包、RSS、llms 索引及全文、图片放大、视频懒加载、提示词一键复制、开源协作模板与 CI。

## 部署

### GitHub Pages

仓库的 Settings → Pages → Source 选择 **GitHub Actions**。`main` 推送后构建与部署到 `https://zbwork.github.io/WorkSmarterWithAI/`。工作流自动配置 `SITE_URL`、`SITE_BASE`。如果尚未开启 Pages，部署任务会提示配置。

### Cloudflare Pages / Vercel

连接本仓库，构建命令 `pnpm build`，输出目录 `docs/.vitepress/dist`，Node 22.18+。设置 `SITE_URL` 为真实站点地址，根域部署设置 `SITE_BASE=/`。PR 预览由托管平台的 Git 集成提供，本仓库不会声称 CI 自动生成不存在的预览链接。

`SITE_URL` 用于 RSS 和站点链接；未配置时本地不生成 RSS，避免发出错误的正式地址。`SITE_BASE` 用于子路径部署。环境变量由命令行或托管平台提供，不自动读取 `.env`。

## 验证与发布边界

自动检查只能发现结构、链接和部分文件问题，不能证明 AI 的输出质量。网站可用与教程完成实测是两件分别记录的事。商业合作须明确披露。

## 许可证

- 原创正文： [CC BY 4.0](LICENSE)。
- 网站代码、原创 Skill 与工作流： [MIT](LICENSE-CODE)。
- 第三方资源保留各自许可证。下载包内分别注明代码与正文快照的授权。

## v0.3 待补

[待实测清单](design/待实测清单.md)列出工具与截图缺口，以及 P2 场景选题。[v0.3 设计图](design/mockups/v0.3-design.png)用于布局参考；[验收记录](design/v0.3-验收记录.md)记录网站检查。本轮只做 P1 结构和现有文章迁移，没有新增首批文章。
