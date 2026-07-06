# AI Coding 素养课：从会用工具到 AI 协同工作

面向校招生的 AI 思维与 AI 协同工作课程站。课程重点不是工具清单或纯代码技巧，而是训练新人用 AI 做目标定义、上下文组织、任务拆解、执行辅助、质量验收和复盘沉淀。

## 内容结构

- AI 时代的 T 型人才：一专更深，多能成链
- AI 新工作语言：Goal、Context、Agent、Claude Tag、Agent Team、Subagent、Worktree、Harness Engineering、Loop Engineering、Eval、Guardrails、Tracing
- 创新路径：创新不是换工具，是重做小流程
- 实际岗位案例：新人周报、需求理解、竞品调研、代码/文档预审、会议纪要、行政审批预审、运营复盘
- 互动工具：术语翻译卡、案例选择器、AI 协同任务卡、7 天行动计划

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
