# 用 Markdown 写教程

新手课和工作任务共用一套排版。正文用 Markdown；有多种工具时，用 `::: platform 工具名` 分段，网站自动显示 Tab。只有一种工具时直接显示正文。

## 1. 选一个模板

- `task.md`：单工具工作任务。
- `task-multi-tool.md`：豆包、Codex、WorkBuddy 三种做法。
- `lesson.md`：新手课。

在项目目录执行以下任意一条，会自动填好日期、署名和目录位置，不覆盖已有文章：

```sh
pnpm new task my-task --scenario office --stage meeting
pnpm new task my-task-three-tools --scenario office --stage meeting --multi-tool
pnpm new lesson my-first-lesson
```

也可以直接复制模板文件。手动复制时，把 `{{DATE}}` 改为当天日期（例如 `2026-11-17`）、`{{AUTHOR}}` 改成 `zbwork`、`{{SCENARIO}}` 改为 `office`、`{{STAGE}}` 改为 `meeting`；新手课的 `{{LESSON}}` 填一个未使用的正整数。正文和文件顶部的 `title` 都改为你的标题。

## 2. 文件放哪里

```text
docs/tasks/my-task/
  index.md                  正文
  images/
    doubao-input.webp        截图
```

新手课放在 `docs/start/my-lesson/index.md`。文章的场景信息决定左侧目录位置，不需要手动改菜单。场景与工具的完整清单在项目根目录 `content.config.ts`，例如 `office / meeting` 表示“通用能力 / 开会”。新增分类也在这里维护。

## 3. 写正文

```markdown
# 文章标题

一句话说清这篇能帮读者做什么。

::: platform doubao

## 1. 打开豆包

这里写步骤。

<PromptBox>

这里写读者可以复制的话。

</PromptBox>

![说明截图里要看哪里](./images/doubao-input.webp)

:::

::: platform codex

## 1. 打开 Codex

这里写另一种做法。

:::

## 检查一下

这里写所有做法都需要核对的信息。

<PlatformTestTable />
```

连续的 `::: platform` 段落会合并成一组 Tab。两段之间只留空行，共用的说明放在整组前面或后面；不要插在两个工具之间。段落里的标题、图片、列表、表格都是普通 Markdown。

工具标记：`doubao`（豆包普通聊天）、`codex`、`workbuddy`、`doubao-work`（豆包工作）。工具名称由网站统一显示，不要自己写 Tab 按钮。

每增加一个工具段落，要在文件顶部 `platforms` 下增加同名记录，照着多工具模板填写。没写完的做法先删掉整段及对应记录，不用留一个空 Tab。`planned`、`unsupported` 不显示在切换栏，但记录仍保留在文末。

正文相同的要求可以放在整组后面，不需要在三种做法里重复。只有一段时仍可保留 `::: platform doubao`，网站会自动去掉 Tab 栏。普通单工具新手课也可以直接写 Markdown 正文。

## 4. 图片、视频和表格

图片随文章放在 `images/` 文件夹，用相对路径引用；推荐 WebP，最长边不超过 1600px，文件不超过 300KB。

```markdown
![点击右下角的发送按钮](./images/doubao-input.webp)

| 事情 | 负责人 | 时间 |
| --- | --- | --- |
| 整理报名表 | 小林 | 周四前 |
```

本地视频可以放在 `docs/public/videos/`，使用下面的写法，部署到 GitHub Pages 子路径也能找到文件：

```html
<script setup>
import { withBase } from 'vitepress'
</script>

<video controls preload="metadata" :src="withBase('/videos/my-demo.mp4')" aria-label="操作演示"></video>
```

视频下方写简短文字步骤，方便不播放视频的读者。也可以用网站已有的视频组件：

```html
<VideoEmbed bilibili="替换成真实BV号" title="操作演示" />
```

## 5. 发布前

模板中的文字只是待填写内容，不是教程，也不是实测记录。填好步骤和图片后运行：

```sh
pnpm check
pnpm build
```

- `methods` 说明用到的资源：模板默认引用技能库中的豆包应用。若使用已有提示词或技能包，改为相应条目的类型和 ID。可复用的提示词仍用 `<PromptBox src="资源ID" part="段落标题" />` 引用，避免重复维护。
- 尚未实测保持 `status: unverified`，`verified` 与 `version` 留空；不要为了显示 Tab 改成已实测。
- 真正跑通后再填写 `active`、真实日期、工具版本和该工具的真实截图。原有的技能包发布门槛仍然适用。
- `cost` 按实际情况填写，模板默认“按所用工具计费”，页面正文用普通话解释需要支付什么。
- GitHub 直接打开 Markdown 可以读文字，但不会显示本站的交互 Tab。用本地网站预览最终效果。
