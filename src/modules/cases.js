import { caseStudies } from "../data/cases.js";

function renderList(items = []) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderCase(item) {
  return `
    <span class="case-role">${item.role}</span>
    <h3>${item.title}</h3>
    <div class="case-compare">
      <div>
        <strong>旧做法</strong>
        <p>${item.oldWay}</p>
      </div>
      <div>
        <strong>AI 协同做法</strong>
        <p>${item.aiWay}</p>
      </div>
      <div>
        <strong>人负责什么</strong>
        <p>${item.humanRole}</p>
      </div>
    </div>
    <div class="case-support-grid">
      <section class="case-list-box">
        <h4>常见失败点</h4>
        <ul>
          ${renderList(item.failures)}
        </ul>
      </section>
      <section class="case-list-box">
        <h4>验收清单</h4>
        <ul>
          ${renderList(item.checklist)}
        </ul>
      </section>
    </div>
    <div class="template-box">
      <span>可复制提示词</span>
      <p id="case-template-text">${item.template}</p>
      <button class="secondary-button" type="button" data-copy-target="case-template-text" data-copy-label="复制提示词">复制提示词</button>
    </div>
  `;
}

export function setupCases() {
  const tabs = document.getElementById("case-tabs");
  const output = document.getElementById("case-output");
  if (!tabs || !output) return;

  tabs.innerHTML = caseStudies
    .map(
      (item, index) => `
        <button
          class="${index === 0 ? "active" : ""}"
          type="button"
          data-case="${item.id}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        >
          <span>${String(index + 1).padStart(2, "0")}</span>${item.title.split("：")[0]}
        </button>
      `,
    )
    .join("");

  output.innerHTML = renderCase(caseStudies[0]);

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-case]");
    if (!button) return;

    tabs.querySelectorAll("button").forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    const selected = caseStudies.find((item) => item.id === button.dataset.case);
    if (selected) output.innerHTML = renderCase(selected);
  });
}
