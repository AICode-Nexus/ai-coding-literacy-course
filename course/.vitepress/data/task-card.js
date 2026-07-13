function clean(value) {
  const text = String(value ?? "").trim();
  return text || "未填写";
}

export function buildTaskCard(input = {}) {
  const task = clean(input.task);
  const audience = clean(input.audience);
  const materials = clean(input.materials);
  const output = clean(input.output);
  const checks = clean(input.checks);
  const boundaries = clean(input.boundaries);

  return [
    "# AI 协同任务卡",
    "",
    "## 目标",
    `- 要完成的任务：${task}`,
    `- 交付对象：${audience}`,
    "",
    "## 材料",
    `- 可用上下文：${materials}`,
    "- 若材料不足，请先列出缺口，不要自行补造事实。",
    "",
    "## 交付物",
    `- 输出要求：${output}`,
    "- 请把事实、判断和待确认项分开表达。",
    "",
    "## 验收",
    `- 检查标准：${checks}`,
    "- 在最终交付前先做一次自检，并说明仍不确定的地方。",
    "",
    "## 边界",
    `- 不可越过：${boundaries}`,
    "- 遇到敏感数据、外部写入、删除、发布或付费动作时暂停并请求人工确认。",
  ].join("\n");
}
