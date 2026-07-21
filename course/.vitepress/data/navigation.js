export const primaryNavigation = Object.freeze([
  {
    id: "map",
    text: "课程地图",
    link: "/guide/00-start",
    activeMatch: "^/guide/00-start",
  },
  {
    id: "materials",
    text: "课后教材",
    link: "/guide/01-t-shaped",
    activeMatch: "^/guide/(?!00-start)",
  },
  {
    id: "instructor",
    text: "讲师",
    link: "/instructor",
    activeMatch: "^/instructor",
  },
  {
    id: "sources",
    text: "来源",
    link: "/sources",
    activeMatch: "^/sources",
  },
  {
    id: "present",
    text: "开始讲课",
    link: "/present",
    query: "scene=1",
    activeMatch: "^/present",
  },
]);
