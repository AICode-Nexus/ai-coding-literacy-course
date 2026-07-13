import { templateById } from "./templates.js";

function clean(value) {
  const text = String(value ?? "").trim();
  return text || "未填写";
}

export function buildTaskCard(input = {}) {
  const labels = templateById["task-card"].fields;
  const values = [
    clean(input.task),
    clean(input.audience),
    clean(input.materials),
    clean(input.actions),
    clean(input.output),
    clean(input.checks),
    clean(input.boundaries),
  ];

  const sections = labels.flatMap((label, index) => ["## " + label, values[index], ""]);
  return [
    "# " + templateById["task-card"].title,
    "",
    ...sections,
    "### 协同提醒",
    "- 材料不足时先列出缺口，不补造事实。",
    "- 事实、判断和待确认项分开表达。",
    "- 涉及敏感数据、外部写入、删除、发布或付费时暂停并请求人工确认。",
  ].join("\n").trim();
}
