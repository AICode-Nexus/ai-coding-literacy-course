export function setupPresentMode() {
  const button = document.querySelector("[data-present-toggle]");
  if (!button) return;

  const sync = (active) => {
    document.body.classList.toggle("present-mode", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", active ? "退出全屏" : "进入全屏");
  };

  button.addEventListener("click", async () => {
    const active = Boolean(document.fullscreenElement) || document.body.classList.contains("present-mode");
    if (active) {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen().catch(() => {});
      }
      sync(false);
      return;
    }

    sync(true);
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen().catch(() => {});
    }
  });

  document.addEventListener("fullscreenchange", () => {
    sync(Boolean(document.fullscreenElement));
  });
}
