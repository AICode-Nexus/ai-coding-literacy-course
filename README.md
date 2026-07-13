# AI 协同方法论课程站

课程全名：**《AI 协同方法论：从“会用 AI”到“善用 AI”》**。

课程目标是讲解 AI 思维，帮助校招生掌握“怎么用 AI 提效、用什么思路用 AI”，形成“人机协作”的工作思维。面向具备通用 AI 基础的校招生，以 A 类学员为主并兼顾已有 AI Coding / Agent 基础的 B 类学员。

课程安排为 **80 分钟授课 + 15 分钟交流**，现场约 1050 人。课程站使用 VitePress 同源双模式：

- **讲师模式**：32 个讲台场景，逻辑画布 1920×1080，浏览器 16:9 全屏、键盘翻页、九节点总览和结构化讲师备注；
- **教程模式**：九章课后教材，完整展示概念、工具、知识点、通用工作场景、边界、岗位迁移、练习、模板和来源。

## 9 个课程节点

1. AI 时代的 T 型人才；
2. 从工具使用到人机协同；
3. AI 基础、模型与工具全景；
4. AI 协同七步法；
5. Context：组织正确的信息；
6. Agent：从回答走向行动；
7. 质量、安全与人的责任；
8. 从一次提效到流程重构；
9. 岗位迁移与行动计划。

全课共用一张协同主地图：

`Goal → Context → Task → Output → Eval → Guardrails → Loop`

场景只用于宽泛讲解和岗位代入，不虚构客户、项目、人物、业务结果或提效数字。动态工具按能力分类并记录官方入口、核验日期与复核周期，不发布排名、价格或长期“最强”结论。

## 本地运行

```bash
npm install
npm run dev
```

开发服务器会输出实际地址。主要路由：

- `/`：课程首页；
- `/guide/00-start`：课程地图；
- `/guide/01-t-shaped` 至 `/guide/09-transfer`：九章教材；
- `/present?scene=1`：讲师模式；
- `/appendix/glossary`：概念词典；
- `/appendix/tool-radar`：工具雷达；
- `/appendix/templates`：模板库；
- `/sources`：来源与核验记录。

## 讲师模式

建议浏览器缩放保持 100%，投屏输出使用 **1920×1080**，进入页面后按 `F` 全屏。页面会按任意 16:9 显示区域等比缩放。

| 操作 | 按键 |
| --- | --- |
| 下一页 | `→`、`↓`、`PageDown`、空格 |
| 上一页 | `←`、`↑`、`PageUp` |
| 第一页 / 最后一页 | `Home` / `End` |
| 九节点场景总览 | `O` |
| 讲师备注 | `N` |
| 浏览器全屏 | `F` |

讲师备注包含讲授目的、可替换说法、可选提问、讲解边界和 B 类进阶补充。场景页码写入 URL 的 `?scene=`，刷新、分享或现场跳页后能够恢复位置。

## 测试与构建

```bash
npm test
npm run build
npm run preview
npm run check:links
```

生产构建不依赖运行时 API、远程字体或外部图片。外部链接只作为课后来源入口；内部链接检查会阻止不存在的课程路由。

模拟 GitHub Pages 子路径：

```bash
COURSE_BASE=/ai-coding-literacy-course/ npm run build
COURSE_BASE=/ai-coding-literacy-course/ npm run preview
```

## 共享内容所有权

- `course/.vitepress/data/course.js`：课程目标、九节点、七步法与七天计划；
- `course/.vitepress/data/scenarios.js`：九个通用工作场景；
- `course/.vitepress/data/concepts.js`：概念定义、作用、边界与来源；
- `course/.vitepress/data/tools.js`：七类工具能力、代表入口与新鲜度；
- `course/.vitepress/data/templates.js`：五份可复用工作模板；
- `course/.vitepress/data/scenes.js`：32 个讲台场景；
- `course/.vitepress/data/sources.js`：稳定、动态与内部来源记录；
- `course/guide/`：九章教程正文；
- `course/.vitepress/theme/components/`：讲台与教程共享呈现组件。

讲课场景引用共享概念、工具和场景 ID；教程组件再将同一条数据展开。新增重要知识时先登记一手来源，再修改共享数据，避免讲台与教程各写一份。

## 发布

`.github/workflows/package-and-deploy.yml` 使用 Node 22，依次执行 `npm ci`、测试、带 `/ai-coding-literacy-course/` base 的 VitePress 构建，并上传 GitHub Pages 构建产物。
