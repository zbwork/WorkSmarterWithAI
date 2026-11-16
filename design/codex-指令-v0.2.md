请按 `design/设计文档.md` v0.2 修改本项目。先完整读完设计文档和 `AGENTS.md`，再动手。本次只做设计文档第 11 节的 **P1 结构**和**现有内容迁移**，不要新写首批文章。

## 背景

手册要同时服务三类读者：新手、在用 AI 的人、AI 从业者 / 开发者。

上一版（commit 044e132）的新手化改造方向是对的，以下全部保留：大白话、PromptBox 一键复制、ArticleSummary、真实截图、不造假的 unverified 规则、只展示有内容的分类。

但上一版有三个问题，本次要改：
1. 把分类改成了「现成指令 / 工作步骤 / 工具入门 / 进阶知识」，需要改回 Skill（技能）/ 工作流 / AI 应用。
2. 缺少级别和平台两个维度。
3. Skill 被藏进了「更多」菜单。

## 要做的事

1. **content.config.ts**
   - `types` 改为 `skill: 'Skill（技能）'`、`workflow: '工作流'`、`app: 'AI 应用'`。去掉 `prompt` 类型，改用 `format: prompt`。
   - 新增 `levels`：入门 / 进阶 / 高级，每级带「需要会什么」的说明和徽章颜色（设计文档 2.3）。
   - 新增 `platforms`：doubao（豆包工作）、workbuddy（WorkBuddy）、zhiban（知办）、codex（Codex）。字段包括 name、slug、操作方式、默认级别、官网 / 文档链接、排序、是否「开发者」平台。知办的链接留空，显示名都从这里读。
   - 平台状态取值：active / unverified / planned / unsupported / outdated。

2. **frontmatter 与脚本**（设计文档 4.1）
   - 支持 `platforms` 字段，每个平台记录 level、status、verified、version、prerequisites。
   - 在 `scripts/content.mjs` 里派生文章级 difficulty、status、verified。
   - 在 `scripts/check.mjs` 里加上 4.1 的全部校验规则，包括「format: skill 至少 2 个平台 active 才进默认列表，否则作为草稿」。
   - `check-stale.mjs` 改成按平台检查过期。
   - 给新规则补上 `tests/` 里的测试。

3. **平台标签页**（设计文档 4.4）
   - 用 markdown-it-container 注册 `::: platform <slug>` 容器，连续的块合并成 PlatformTabs。
   - 默认平台的优先级：URL `?platform=` > localStorage 偏好 > 配置里排第一的平台。
   - 任意页面切换标签都会更新全站偏好。
   - 标签头显示平台名、级别徽章、状态图标；Codex 标「开发者」。
   - planned 显示「即将补充」和投稿链接；unsupported 显示原因。
   - 全部平台内容都输出进 HTML（未选中的只是隐藏），保证站内搜索和 llms-full.txt 能收录。
   - 手机上标签头横向滑动。
   - 要求键盘可操作，并有正确的 ARIA 属性（tablist / tab / tabpanel）。

4. **新组件**：PlatformBadges、PlatformPicker、LevelBadge、Term（读取根目录新建的 `glossary.yml`，先收录 Skill、MCP、Agent、提示词、token、API Key、SKILL.md 七条）、PlatformTestTable。
   - ArticleSummary、ArticleCard 加入平台状态和级别。
   - Catalog 改成：平台 × 级别联动，只显示有内容的选项，选项后显示篇数，筛选状态写进 URL。

5. **导航、侧边栏、页面**（设计文档第 3 节）
   - 导航改为：新手开始 | Skill（技能） | 工作流 | AI 应用 | 按平台 ▾ | 按行业 | 全部教程 | 更多 ▾。
   - 侧边栏改为「类型 → 级别 → 文章」，只有一篇的分组不再单独套一层。
   - 新增 `docs/platforms/` 四个入门页骨架。依据官方文档写豆包工作和 WorkBuddy 的「怎么导入技能」步骤，并附上官方链接；没有真实截图的位置，按 AGENTS.md 规则写清楚「待补截图」，不放示意图冒充。知办只写「待确认」。
   - 新增 `docs/paths/` 三条学习路线，和 `docs/glossary/`。
   - 首页加「你现在是？」和「你用哪个工具？」两个问题（PlatformPicker），保留第一课卡片。把「不用懂代码」这类绝对说法改成「新手跟着做就会，懂行的人也有干货」。
   - `/prompts/` 改为跳转到 `/skills/?format=prompt`。

6. **模板**：新增 `templates/skill.md`（设计文档 4.3 的四平台模板）；其他模板加上「做完是什么样」、两个 `::: details` 折叠块（进阶玩法、给懂行的人）和测试记录。同步更新 `scripts/new.mjs`。

7. **现有内容迁移**（设计文档第 11 节迁移表）
   - 按表调整六篇文章的 type、format 和 platforms，URL 不变，已有的真实截图和实测记录原样保留。
   - task-brief：在 `skills/task-brief/` 新增标准 `SKILL.md`（YAML 头含 name、description），文章改成四平台模板。
   - 四个平台里，只有你真正跑过的才能标 active。你可以在**项目级或临时目录**里实测 Codex 标签，记录真实的命令、输出和版本。不要修改用户的全局 Codex 配置；做不到就标 unverified。
   - 豆包工作、WorkBuddy、知办你无法实测，标 unverified 或 planned，步骤写成「依据官方文档」，并附上链接。

8. **文档**
   - 更新 `AGENTS.md`、`CONTRIBUTING.md`：写入归类规则、级别定义、平台规则、Term 用法、「新手区不出现命令行」。
   - 新增 Issue 模板「平台实测投稿」。
   - README 的分类描述同步改成三类。

## 约束

- 不编造实测日期、版本、截图、评分或输出；不能把示意图当成实际结果。
- 不删除已有的真实截图和 `verified` 记录；所有已发布的 URL 保持可访问。
- 平台名、级别、类型只在 content.config.ts 定义，不在组件里硬编码。
- 新手区（标签页里非 Codex 部分、折叠块之前的正文）不出现命令行。
- 不引入新的大型依赖；markdown-it-container 可以用（VitePress 已内置依赖）。

## 完成标准

1. `pnpm check` 和 `pnpm build` 通过，根路径和 GitHub Pages 子路径都检查一遍。
2. 手动检查以下页面在桌面和 375px 宽度下都正常：首页、`/catalog/`、`/skills/task-brief/`、`/platforms/doubao/`。
3. 在 task-brief 页切换到 Codex 标签后，打开另一篇有平台标签的文章，默认显示的也是 Codex；`?platform=doubao` 能覆盖这个偏好。
4. 总览筛选里不出现 0 篇的选项。
5. 新建 `design/待实测清单.md`，列出所有 unverified / planned 的「文章 × 平台」，以及每项需要补的截图（文件名按设计文档第 5 节命名）。用户会照这份清单去实测、截图。
6. 分几个有意义的 commit 提交，最后用一段话汇报：改了什么、哪些没做、为什么没做。
