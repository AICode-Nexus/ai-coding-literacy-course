# AI 协同工作法课程站

面向具备对话式 AI 基础的校招生，以 **80 分钟授课 + 15 分钟交流**完成从“会用 AI”到“能把 AI 组织成可验收工作系统”的迁移。

课程站采用 VitePress 同源双模式：

- **讲师模式**：逻辑画布 1920×1080、16:9 等比缩放，包含 32 个视觉场景、键盘翻页、总览和讲师备注；
- **教程模式**：8 章可搜索教材、概念边界卡、7 个案例、任务卡实验室、课后训练与来源记录。

## 课程主线

`Goal → Context → Task → Output → Eval → Guardrails → Loop`

- 主线服务多数以对话式 AI 为主的 A 类学员；
- 蓝色进阶层兼顾已有 Cursor、Claude Code、Codex 等 Coding Agent 基础的 B 类学员；
- 内容以稳定方法为主，动态工具能力标记核验日期，不固化模型排名、价格或窗口参数。

## 本地开发

```bash
npm install
npm run dev
```

VitePress 会输出本地访问地址，默认通常为 `http://localhost:5173/`。

主要入口：

- `/`：课程首页；
- `/guide/00-start`：课后教程；
- `/present?scene=1`：讲师模式；
- `/sources`：官方与内部来源。

## 讲师模式操作

建议浏览器缩放保持 100%，投屏输出设为 **1920×1080**，进入页面后按 `F` 全屏。

| 操作 | 按键 |
| --- | --- |
| 下一页 | `→`、`↓`、`PageDown`、空格 |
| 上一页 | `←`、`↑`、`PageUp` |
| 第一页 / 最后一页 | `Home` / `End` |
| 场景总览 | `O` |
| 讲师备注 | `N` |
| 浏览器全屏 | `F` |

场景页码写入 URL 的 `?scene=`，刷新、分享链接或现场跳页后都能恢复位置。

## 测试与构建

```bash
npm test
npm run build
npm run preview
```

构建产物位于 `dist/`。生产构建不依赖运行时 API、远程字体或外部图片；外部链接只用于课后查阅来源。

模拟 GitHub Pages 子路径：

```bash
COURSE_BASE=/ai-coding-literacy-course/ npm run build
npm run preview
```

## 内容维护

- 共享数据：`course/.vitepress/data/`
- 讲课场景：`course/.vitepress/data/scenes.js`
- 教材章节：`course/guide/`
- 交互组件：`course/.vitepress/theme/components/`
- 视觉系统：`course/.vitepress/theme/styles/`
- 来源与核验：`course/.vitepress/data/sources.js`

新增重要概念时，先在来源注册表中记录官方或内部原始来源，再写入概念、案例或场景。动态来源在每次正式授课前复核；过时事实直接删除，不为保留历史而干扰课程主线。

## GitHub Pages

`.github/workflows/package-and-deploy.yml` 使用 Node 22，依次执行 `npm ci`、测试、带 `/ai-coding-literacy-course/` base 的 VitePress 构建，并在 `main` 分支发布 GitHub Pages。
