import { defineConfig } from "vitepress";

const base = process.env.COURSE_BASE || "/";

export default defineConfig({
  lang: "zh-CN",
  title: "AI 协同工作法",
  description: "面向校招生的 AI 协同方法论课程与 16:9 讲师模式",
  base,
  cleanUrls: true,
  lastUpdated: true,
  outDir: "../dist",
  publicDir: "../assets",
  head: [
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
      { text: "教材", link: "/guide/01-shift" },
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
          text: "方法",
          items: [
            { text: "01 工作方式迁移", link: "/guide/01-shift" },
            { text: "02 AI 协同七步法", link: "/guide/02-collaboration" },
            { text: "03 Context 与持久上下文", link: "/guide/03-context" },
            { text: "04 Agent 工作系统", link: "/guide/04-agent-system" },
          ],
        },
        {
          text: "实践",
          items: [
            { text: "05 真实案例", link: "/guide/05-cases" },
            { text: "06 质量与安全", link: "/guide/06-quality" },
            { text: "07 课后训练", link: "/guide/07-practice" },
          ],
        },
        {
          text: "附录",
          items: [{ text: "工具雷达", link: "/appendix/tool-radar" }],
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
