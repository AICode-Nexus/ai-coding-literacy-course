import { taskTemplates, sevenDayTraining } from "../data/workshop.js";

function getFormValue(form, name) {
  return form.elements.namedItem(name)?.value.trim() || "";
}

function getSelectedTemplateId(form) {
  return getFormValue(form, "template");
}

function getTemplate(id) {
  return taskTemplates.find((template) => template.id === id) || taskTemplates[0];
}

function getSelectedTemplate(form) {
  const id = getSelectedTemplateId(form);
  return id ? getTemplate(id) : null;
}

function setInputValue(form, name, value) {
  const field = form.elements.namedItem(name);
  if (field) field.value = value;
}

function applyTemplate(form, template) {
  setInputValue(form, "role", template.role);
  setInputValue(form, "task", template.task);
  setInputValue(form, "goal", template.goal);
  setInputValue(form, "material", template.material);
  setInputValue(form, "standard", template.standard);
  setInputValue(form, "boundary", template.boundary);
}

function numbered(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function getCheckedValues(form, name) {
  const fields = form.elements.namedItem(name);
  if (!fields) return [];

  const controls = typeof fields.length === "number" && !fields.tagName ? Array.from(fields) : [fields];
  return controls.filter((field) => field.checked).map((field) => field.value.trim()).filter(Boolean);
}

function getLegacyOutputSections(form) {
  const outputMap = {
    思路拆解: "拆出目标、背景、关键问题、缺失材料和待确认判断",
    执行步骤: "输出按顺序可执行的步骤、负责人、依赖条件和下一步动作",
    提示词示例: "给出可以直接复用的提示词示例，并标明需要补充的上下文",
    风险与注意事项: "列出事实不确定、权限边界、口径风险和必须人工确认的事项",
  };
  const sections = getCheckedValues(form, "deliverables").map((item) => outputMap[item] || item);
  return sections.length
    ? sections
    : ["拆出目标、材料、执行步骤、风险提醒和需要人工确认的问题"];
}

function buildTaskCard(form) {
  const template = getSelectedTemplate(form);
  const fallback = template || taskTemplates[0];
  const role = getFormValue(form, "role") || fallback.role;
  const task = getFormValue(form, "task") || fallback.task;
  const goal = getFormValue(form, "goal") || fallback.goal;
  const material = getFormValue(form, "material") || fallback.material;
  const standard = getFormValue(form, "standard") || fallback.standard;
  const boundary = getFormValue(form, "boundary") || fallback.boundary;
  const outputSections = template ? template.outputSections : getLegacyOutputSections(form);
  const risk =
    template?.risk ||
    "AI 可以先整理结构和初稿，但事实、优先级、承诺时间、敏感信息和最终判断必须由人确认。";

  return `AI 协同任务卡

模板：${template?.title || "自定义任务卡"}
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
${numbered(outputSections)}

我如何验收：
${standard}

边界：
${boundary}

风险提醒：
${risk}

下次如何复用：
把本次好输出、返工原因和新增检查项沉淀为模板，下一次先按模板跑预审。`;
}

function renderTemplateOptions(container, activeId) {
  container.innerHTML = taskTemplates
    .map(
      (template) => `
        <label class="template-option">
          <input type="radio" name="template" value="${template.id}" ${template.id === activeId ? "checked" : ""} />
          <span>${template.title}</span>
          <small>${template.task}</small>
        </label>
      `,
    )
    .join("");
}

function renderTraining(container) {
  container.innerHTML = sevenDayTraining
    .map(
      (day) => `
        <article class="training-day">
          <span>Day ${day.day}</span>
          <h3>${day.goal}</h3>
          <dl>
            <div><dt>当天任务</dt><dd>${day.task}</dd></div>
            <div><dt>产出物</dt><dd>${day.output}</dd></div>
            <div><dt>检查项</dt><dd>${day.check}</dd></div>
            <div><dt>反馈问题</dt><dd>${day.feedbackQuestion}</dd></div>
          </dl>
        </article>
      `,
    )
    .join("");
}

function renderLegacyTrainingPlan(container) {
  container.innerHTML = sevenDayTraining
    .map((day) => `<li>Day ${day.day}：${day.goal}，完成${day.output}。</li>`)
    .join("");
}

export function setupTaskCard() {
  const form = document.getElementById("task-card-form");
  const output = document.getElementById("task-card-output");
  const action = document.getElementById("task-card-generate");
  const templateOptions = document.getElementById("task-template-options");
  const training = document.getElementById("seven-day-training");
  const legacyPlan = document.getElementById("seven-day-plan");
  if (!form || !output || !action) return;

  if (templateOptions) {
    renderTemplateOptions(templateOptions, taskTemplates[0].id);
    applyTemplate(form, taskTemplates[0]);
  }
  if (training) renderTraining(training);
  if (legacyPlan) renderLegacyTrainingPlan(legacyPlan);

  const update = () => {
    output.textContent = buildTaskCard(form);
    output.hidden = false;
  };

  if (templateOptions) {
    templateOptions.addEventListener("change", () => {
      const template = getTemplate(getSelectedTemplateId(form));
      applyTemplate(form, template);
      if (!output.hidden) update();
    });
  }

  action.addEventListener("click", update);
  form.addEventListener("input", () => {
    if (!output.hidden) update();
  });
}
