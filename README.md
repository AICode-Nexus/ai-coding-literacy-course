# AI Coding 素养课：从会用工具到 AI 协同工作

面向校招生的 90 分钟 AI 协同工作坊课程站。课程重点不是工具清单或纯代码技巧，而是训练新人用 AI 做目标定义、上下文组织、任务拆解、执行辅助、质量验收和复盘沉淀。

## 课程产出

- 一张可复用 AI 协同任务卡
- 一组可复制提示词
- 一份质量验收清单
- 一份 7 天复盘记录

## 90 分钟结构

- 8 分钟：为什么不是“会用工具”
- 15 分钟：AI 协同工作法
- 20 分钟：从问题到任务卡
- 25 分钟：岗位实战案例
- 12 分钟：质量验收与边界
- 10 分钟：7 天训练计划

## 内容结构

- AI 时代的 T 型人才：一专更深，多能成链
- AI 新工作语言：Goal、Context、Prompt、Agent、Eval、Guardrails、Tracing、Harness Engineering、Loop Engineering、Subagent、Worktree
- 方法工具箱：任务卡模板、提示词结构、验收清单
- 岗位案例：新人周报、需求理解、竞品调研、代码/文档预审、会议纪要、运营复盘、用户反馈整理
- 课后训练：7 天行动计划和 AI 协同工作包

## Preview

```bash
npm run dev
```

访问 `http://localhost:4173/`。

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

构建产物输出到 `dist/`，用于 GitHub Pages workflow 部署。

## Publish

`.github/workflows/package-and-deploy.yml` 会在 `main` 分支运行测试、打包并通过 GitHub Pages 发布。
