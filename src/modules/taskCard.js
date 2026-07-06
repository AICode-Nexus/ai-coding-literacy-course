import { sevenDayPlan } from "../data/workflow.js";

function getValue(form, name) {
  return form.elements.namedItem(name)?.value.trim() || "";
}

function getCheckedValues(form, name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value.trim());
}

function buildTaskCard(form) {
  const role = getValue(form, "role") || "校招生";
  const task = getValue(form, "task") || "整理本周项目进展";
  const goal = getValue(form, "goal") || "形成给导师可读、可判断、可追踪的工作结果";
  const material = getValue(form, "material") || "任务记录、会议结论、当前阻塞、已有文档";
  const standard = getValue(form, "standard") || "事实准确、结构清楚、风险可见、下一步明确";
  const boundary = getValue(form, "boundary") || "不编造事实，不替代导师或负责人做最终判断";
  const deliverables = getCheckedValues(form, "deliverables");
  const deliverableText = deliverables.length
    ? deliverables.map((item, index) => `${index + 1}. ${item}`).join("\n")
    : "1. 思路拆解\n2. 执行步骤\n3. 风险与注意事项";

  return `AI 协同任务卡

角色：${role}
任务：${task}
目标：${goal}

输入材料：
${material}

AI 先做：
1. 提取关键信息和缺失项
2. 按目标重组结构
3. 生成初稿、检查清单或行动项
4. 标出不确定信息和需要人工确认的问题

期望输出：
${deliverableText}

我如何验收：
${standard}

边界：
${boundary}

下次如何复用：
把本次好输出、返工原因和新增检查项沉淀为模板，下一次先按模板跑预审。`;
}

export function setupTaskCard() {
  const form = document.getElementById("task-card-form");
  const output = document.getElementById("task-card-output");
  const action = document.getElementById("task-card-generate");
  const plan = document.getElementById("seven-day-plan");
  if (!form || !output || !action) return;

  const update = () => {
    output.textContent = buildTaskCard(form);
    output.hidden = false;
  };

  action.addEventListener("click", update);
  form.addEventListener("input", () => {
    if (!output.hidden) update();
  });

  if (plan) {
    plan.innerHTML = sevenDayPlan.map((item) => `<li>${item}</li>`).join("");
  }
}
