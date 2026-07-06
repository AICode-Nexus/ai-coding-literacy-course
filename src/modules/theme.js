const storageKey = "ai-coding-course-theme";

export function setupTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(storageKey);

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (!button) return;
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute("aria-label", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
  };

  applyTheme(savedTheme === "dark" ? "dark" : "light");

  button?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
}
