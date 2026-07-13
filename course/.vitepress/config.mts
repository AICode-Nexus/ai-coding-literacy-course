import { defineConfig } from "vitepress";

const base = process.env.COURSE_BASE || "/";

export default defineConfig({
  lang: "zh-CN",
  title: "AI 协同方法论",
  description: "从会用 AI 到善用 AI：面向校招生的人机协作课程与 16:9 讲师模式",
  base,
  cleanUrls: true,
  lastUpdated: true,
  outDir: "../dist",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: `${base}favicon.svg` }],
    ["meta", { name: "theme-color", content: "#061319" }],
    ["meta", { name: "color-scheme", content: "light dark" }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索教材", buttonAriaLabel: "搜索教材" },
          modal: {
            noResultsText: "没有找到相关内容",
            resetButtonTitle: "清除查询",
            footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
          },
        },
      },
    },
    nav: [
      { text: "课程地图", link: "/guide/00-start" },
      { text: "教材", link: "/guide/01-t-shaped" },
      { text: "讲师模式", link: "/present" },
      { text: "来源", link: "/sources" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始",
          items: [{ text: "课程地图", link: "/guide/00-start" }],
        },
        {
          text: "九个课程节点",
          items: [
            { text: "01 AI 时代的 T 型人才", link: "/guide/01-t-shaped" },
            { text: "02 从工具使用到人机协同", link: "/guide/02-collaboration-shift" },
            { text: "03 AI 基础、模型与工具全景", link: "/guide/03-ai-landscape" },
            { text: "04 AI 协同七步法", link: "/guide/04-method" },
            { text: "05 Context：组织正确的信息", link: "/guide/05-context" },
            { text: "06 Agent：从回答走向行动", link: "/guide/06-agent" },
            { text: "07 质量、安全与人的责任", link: "/guide/07-quality" },
            { text: "08 从一次提效到流程重构", link: "/guide/08-workflow" },
            { text: "09 岗位迁移与行动计划", link: "/guide/09-transfer" },
          ],
        },
        {
          text: "附录",
          items: [
            { text: "概念词典", link: "/appendix/glossary" },
            { text: "工具雷达", link: "/appendix/tool-radar" },
            { text: "模板库", link: "/appendix/templates" },
            { text: "来源与核验", link: "/sources" },
          ],
        },
      ],
    },
    outline: { level: [2, 3], label: "本页内容" },
    docFooter: { prev: "上一章", next: "下一章" },
    lastUpdated: { text: "最后更新" },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "课程目录",
    darkModeSwitchLabel: "切换主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});
