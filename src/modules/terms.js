import { allTerms, termGroups } from "../data/terms.js";

function renderTerm(term) {
  if (!term) return "";

  return `
    <div class="term-detail__head">
      <span>${term.groupLabel} · ${term.groupDescription}</span>
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
      <div>
        <dt>课堂练习</dt>
        <dd>${term.classroomUse}</dd>
      </div>
    </dl>
  `;
}

export function setupTerms() {
  const groupWrap = document.getElementById("term-groups");
  const listWrap = document.getElementById("term-list");
  const detail = document.getElementById("term-detail");
  if (!groupWrap || !listWrap || !detail) return;

  const setPressedState = (wrap, activeButton) => {
    wrap.querySelectorAll("button").forEach((item) => {
      const isSelected = item === activeButton;
      item.classList.toggle("active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
  };

  const renderList = (groupId = termGroups[0]?.id, activeName) => {
    const terms = allTerms.filter((term) => term.group === groupId);
    const selectedName = activeName || terms[0]?.name;

    listWrap.innerHTML = terms
      .map(
        (term) => `
          <button
            class="${term.name === selectedName ? "active" : ""}"
            type="button"
            data-term="${term.name}"
            data-term-group="${term.group}"
            aria-pressed="${term.name === selectedName ? "true" : "false"}"
          >
            <span>${term.groupLabel}</span>
            ${term.name}
          </button>
        `,
      )
      .join("");

    const selected = terms.find((term) => term.name === selectedName) || terms[0];
    detail.innerHTML = renderTerm(selected);
  };

  groupWrap.innerHTML = termGroups
    .map(
      (group, index) => `
        <button
          class="${index === 0 ? "active" : ""}"
          type="button"
          data-term-group="${group.id}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        >
          <strong>${group.label}</strong>
          <span>${group.description}</span>
        </button>
      `,
    )
    .join("");

  groupWrap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term-group]");
    if (!button) return;

    setPressedState(groupWrap, button);
    const groupId = button.dataset.termGroup;
    const firstTerm = allTerms.find((term) => term.group === groupId);
    renderList(groupId, firstTerm?.name);
  });

  listWrap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term]");
    if (!button) return;

    setPressedState(listWrap, button);
    const term = allTerms.find(
      (item) => item.group === button.dataset.termGroup && item.name === button.dataset.term,
    );
    if (term) detail.innerHTML = renderTerm(term);
  });

  renderList(termGroups[0]?.id);
}
