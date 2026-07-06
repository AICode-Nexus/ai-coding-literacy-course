export function setupCopyButtons() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-target]");
    if (!button) return;

    const target = document.getElementById(button.dataset.copyTarget);
    const text = target?.value || target?.textContent || "";
    if (!text.trim()) return;

    await navigator.clipboard?.writeText(text).catch(() => {});
    button.textContent = "已复制";
    setTimeout(() => {
      button.textContent = button.dataset.copyLabel || "复制";
    }, 1400);
  });
}
