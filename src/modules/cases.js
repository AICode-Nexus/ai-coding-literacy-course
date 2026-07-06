import { caseStudies } from "../data/cases.js";

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
    <div class="template-box">
      <span>可复用模板</span>
      <p>${item.template}</p>
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
        <button class="${index === 0 ? "active" : ""}" type="button" data-case="${item.id}">
          <span>${String(index + 1).padStart(2, "0")}</span>${item.title.split("：")[0]}
        </button>
      `,
    )
    .join("");

  output.innerHTML = renderCase(caseStudies[0]);

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-case]");
    if (!button) return;

    tabs.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    const selected = caseStudies.find((item) => item.id === button.dataset.case);
    if (selected) output.innerHTML = renderCase(selected);
  });
}
