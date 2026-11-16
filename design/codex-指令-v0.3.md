请按 `design/设计文档.md` v0.3 修改本项目。动手前先完整读完设计文档（重点是第 0、2、3、4、11 节）和 `AGENTS.md`。

本次是在 v0.2 现有实现（commit `04e2313`）上改结构，只做**第 11 节的 P1 结构和现有 6 篇迁移**，不新写首批文章。`design/codex-指令-v0.2.md` 已经执行完，不要再按它做。`design/mockups/v0.2-design.png` 作废，不要参考。

## 背景

v0.2 按技术组织全站（导航：Skill / 工作流 / AI 应用 / 按平台 / 按行业），读者却是带着「我要做一件事」来的。v0.3 改成**按场景组织**：

- 主入口是「工作 / 生活 → 场景 → 环节 → 任务」。
- 一篇文章就是一个任务，文章里给出几种做法，每种做法标 Skill（技能）/ 工作流 / AI 应用。
- 工具（豆包、豆包工作、WorkBuddy、知办、Codex……）只出现在文章的标签页里，不上导航。
- 新增技能库，汇总全站用到的工具；搜索和「全部教程」合并成 `/search/`。

v0.2 里这些**保留并复用**，不要重写：`::: platform` 容器和 PlatformTabs（含偏好优先级、ARIA、全部内容输出进 HTML、手机横滑）、平台状态派生、按工具过期、LevelBadge、PlatformBadges、PlatformTestTable、Term 和 glossary.yml、折叠块、PromptBox、ArticleSummary、第一课卡片、「只展示有内容的分类」、不造假规则、现有测试。

## 要做的事

1. **content.config.ts**（设计文档 2.2、2.5、3.3）
   - 新增 `scenarios`：每个场景有 id、name、group（`office` / `role` / `project` / `life`）、一句话简介、order、`stages`（slug、name、order；生活类可以为空）。按 3.3 节写入初始清单。
   - 新增 `apps`，取代 `platforms` 和 `tools`。字段：slug、name、category、website、docs、tab、skills、developer、defaultLevel、order。按 2.5 节写入初始工具。
   - **拆分豆包**：`doubao` = 豆包（App / 网页对话），`doubao-work` = 豆包工作。
   - 新增 `methodTypes`：`skill: 'Skill（技能）'`、`workflow: '工作流'`、`app: 'AI 应用'`。保留 `formatLabels`、`levels`、`platformStatuses`、`kinds`。去掉 `types` 和 `industries`。
   - 偏好 key 换一个新值，避免旧的 `doubao` 偏好被当成新的豆包。

2. **frontmatter、派生和校验**（设计文档 4.1、4.2）
   - 任务文章支持 `scenarios`、`methods`、`featured`；新手课支持 `lesson`；技能库条目支持 `libraryType`、`format`、`original`、`source`、`download`、`app`、`platforms`。
   - `scripts/content.mjs` 读取 `docs/tasks`、`docs/start`、`docs/library`、`docs/reviews`，派生文章级字段，并从 `methods[].use` 反查每个技能库条目「用在哪些任务」。
   - `scripts/check.mjs` 实现 4.1 节全部校验规则。发布门槛改为：推荐做法是技能包的任务，至少 1 个工具 active，否则为草稿。
   - 更新并补充 `tests/`：场景和环节引用、`use` 引用、技能包任务必须带全部 `skills: true` 工具、「检查一下」小节、草稿门槛、反查「用在哪些任务」。

3. **导航和侧边栏**（设计文档 3.1、3.4）
   - 导航：`新手入门 | 工作 ▾ | 生活 ▾ | 技能库 | 搜索 | 更多 ▾`。工作下拉分「职场通用 / 按岗位 / 按项目」三组，只列有内容的场景，末尾放「全部场景 →」；生活没有内容时整项不显示。
   - 侧边栏三套：
     - `/tasks/`、`/scenarios/`：「工作 / 生活 → 场景 → 环节 → 任务」，默认折叠，当前场景展开，任务后带最低级别徽章；一篇属于多个场景时每处都出现；只有一篇的环节不单独套一层。
     - `/start/`：按 `lesson` 排序。
     - `/library/`：Skill（技能）/ 工作流 / AI 应用，只显示有条目的组。

4. **新页面和组件**（设计文档 3.2、3.5、3.6、3.7）
   - 场景总览 `/scenarios/`，以及场景页 `/scenarios/<id>/`（动态路由，只为有内容的场景生成）。
   - 技能库 `/library/` 和条目页 `/library/skills|workflows|apps/<id>/`；条目页上自动显示「用在哪些任务」（UsedIn 组件）。
   - 搜索页 `/search/`：
     - 用 VitePress 已带的 minisearch 在构建时生成索引，不加新依赖。
     - 不输入关键词时列出全部内容。
     - 筛选：场景、级别、做法、工具、只看已实测、只看自研。工具和级别联动，0 篇的选项不显示，选项后显示篇数，关键词和筛选都写进 URL。
     - 去掉 VitePress 内置的搜索弹窗；导航上放「搜索」入口，⌘K / Ctrl+K 跳到 `/search/` 并聚焦搜索框。
   - 首页按 3.7 节改：「你想用 AI 做什么？」+ 搜索框 + 常见任务按钮（`featured` 且已发布的）、第一课卡片、三个入口（新手入门 / 工作场景卡片 / 生活场景卡片，生活没内容时不显示）、一行「已经会用了？去技能库 →」。去掉「你现在是？」和 PlatformPicker。
   - 新组件：ScenarioPage、ScenarioCards、Library、UsedIn、MethodBadge、SearchPage（取代 Catalog）、TaskChips。
   - PromptBox 新增 `src` 属性，读取 `skills/<id>/prompt.md`；一篇里有多段提示词时，用 `part` 属性对应 prompt.md 里的二级标题。原有的 slot 写法继续可用。
   - 标签页上方加小标题「你用哪个工具？」。读者能看到的界面文案里，「平台」一律改为「工具」。

5. **内容迁移**（设计文档 11.1）
   - 按迁移表移动 6 篇文章、补 `scenarios` 和 `methods`、按表改标题。已有的真实截图、实测记录和正文步骤原样保留，图片跟着文章一起移动。
   - **修正豆包记录**：
     - 「会议待办」和「第一条消息」的实测发生在豆包普通聊天里，key 用 `doubao`，状态保持 active。
     - task-brief 原来的 `doubao` 条目改为 `doubao-work`。
     - interview-to-post 和 review-feedback 讲的是复制提示词到对话框，用 `doubao`。
   - 把会议待办、访谈初稿、评论分类三篇里的提示词提取到 `skills/<id>/prompt.md`，文章改用 `<PromptBox src=… />`。页面上显示的文字必须和原来一字不差。
   - 建技能库首批条目（11.1 节第二张表）。v0.2 `/platforms/doubao/` 页面里两种内容要分开放：豆包工作的导入技能步骤放进 `doubao-work` 条目，普通聊天的内容放进 `doubao` 条目和 `/start/first-message/`。知办不建条目。
   - 每篇任务文章补「检查一下」小节。内容只能从文中已有的检查提示整理出来，不要编造新的实测发现。
   - 旧 URL 按 11.2 节全部改成跳转页，沿用现有 `/prompts/` 跳转页的写法；`/catalog/` 跳转时保留查询参数。跳转页不进搜索索引、站点地图和 llms.txt。

6. **模板和脚本**
   - 新增 `templates/task.md`（4.4 节）、`lesson.md`、`library-skill.md`、`library-app.md`，调整 `review.md`。删掉不再使用的 `skill.md`、`guide.md`、`original.md`。
   - `scripts/new.mjs` 支持 `pnpm new task|lesson|skill|app|review`：新建任务时要求选择场景和环节。

7. **文档**
   - 更新 `AGENTS.md`、`CONTRIBUTING.md`：写入场景 / 环节 / 任务的归类规则、做法类型、工具标签规则、标题从事情出发、「检查一下」必写、生活类写作要求（4.7 节）、新手区不出现命令行。
   - Issue 模板「平台实测投稿」改名为「工具实测投稿」，key 按新的工具 slug 更新；新增 Issue 模板「我想学这件事」。
   - README 的内容介绍改成按场景描述。
   - `llms.txt` 按「场景 → 环节 → 任务」组织。

## 约束

- 不编造实测日期、版本、截图、评分或输出；不新增任何实测结论。
- 不删除已有的真实截图和 `verified` 记录；所有已发布的 URL 都要能访问（直接访问或跳转）。
- 场景、环节、工具、级别、做法类型只在 `content.config.ts` 里定义，组件里不硬编码名称。
- 新手区（标签页里非 Codex 的部分、折叠块之前的正文）不出现命令行。
- 不引入新依赖。
- `docs/public/raw/` 和 `docs/.vitepress/dist/` 是构建产物，不要手改。

## 完成标准

1. `pnpm check`、`pnpm build` 通过，根路径和 `/WorkSmarterWithAI/` 子路径都检查一遍。
2. 在桌面和 375px 宽度下检查：首页、`/scenarios/`、`/scenarios/office/`、`/tasks/meeting-actions/`、`/library/`、`/library/apps/doubao-work/`、`/search/`、`/start/`。手机上不能出现横向溢出。
3. 侧边栏：打开 `/tasks/review-feedback/` 时，「电商运营」自动展开，并且这篇在「AI 应用开发 / 运营」下也出现。
4. 搜索：`/search/?q=会议` 能搜到会议待办；选「工具：豆包」后级别只剩有内容的选项；`?draft=1` 能看到 task-brief。
5. 跳转：11.2 节表里每个旧 URL 都实际打开一次，确认跳到正确的新页面。
6. 标签页：沿用 v0.2 的验收方法，确认偏好会跨文章保持、`?platform=` 能覆盖偏好。
7. 导航、首页、侧边栏里不出现 0 篇的场景、环节或分组。
8. 更新 `design/待实测清单.md`：按新的工具 slug 和新路径重写，并增加「按场景看缺口」一节，列出 3.3 节里还没有任何任务的场景和环节，作为 P2 选题参考。
9. 新建 `design/v0.3-验收记录.md`，格式参照 v0.2 的验收记录。
10. 分几个有意义的 commit 提交，最后用一段话汇报：改了什么、哪些没做、为什么没做。
