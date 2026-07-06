import { allTerms, termGroups } from "../data/terms.js";

function renderTerm(term) {
  return `
    <div class="term-detail__head">
      <span>${term.groupLabel}</span>
      <strong>${term.name}</strong>
    </div>
    <h3>${term.title}</h3>
    <dl>
      <div>
        <dt>解决的问题</dt>
        <dd>${term.problem}</dd>
      </div>
      <div>
        <dt>新人怎么用</dt>
        <dd>${term.example}</dd>
      </div>
    </dl>
  `;
}

export function setupTerms() {
  const groupWrap = document.getElementById("term-groups");
  const listWrap = document.getElementById("term-list");
  const detail = document.getElementById("term-detail");
  if (!groupWrap || !listWrap || !detail) return;

  const renderList = (groupId = "all", activeName = allTerms[0].name) => {
    const terms = groupId === "all" ? allTerms : allTerms.filter((term) => term.group === groupId);
    listWrap.innerHTML = terms
      .map(
        (term) => `
          <button class="${term.name === activeName ? "active" : ""}" type="button" data-term="${term.name}">
            <span>${term.groupLabel}</span>
            ${term.name}
          </button>
        `,
      )
      .join("");

    const selected = terms.find((term) => term.name === activeName) || terms[0];
    detail.innerHTML = renderTerm(selected);
  };

  groupWrap.innerHTML = [
    '<button class="active" type="button" data-term-group="all">全部</button>',
    ...termGroups.map((group) => `<button type="button" data-term-group="${group.id}">${group.label}</button>`),
  ].join("");

  groupWrap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term-group]");
    if (!button) return;

    groupWrap.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    const groupId = button.dataset.termGroup;
    const firstTerm = groupId === "all" ? allTerms[0] : allTerms.find((term) => term.group === groupId);
    renderList(groupId, firstTerm?.name);
  });

  listWrap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term]");
    if (!button) return;

    listWrap.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    const term = allTerms.find((item) => item.name === button.dataset.term);
    if (term) detail.innerHTML = renderTerm(term);
  });

  renderList();
}
