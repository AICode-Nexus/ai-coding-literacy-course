export function setupNav() {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length) return;

  const targets = links
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      return id ? { id, link, element: document.getElementById(id) } : null;
    })
    .filter((item) => item?.element);

  const setActive = (activeId) => {
    targets.forEach(({ id, link }) => {
      const active = id === activeId;
      link.classList.toggle("active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const currentIdFromScroll = () => {
    const offset = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) + 24;
    return targets.reduce((current, target) => {
      const top = target.element.getBoundingClientRect().top;
      return top <= offset ? target.id : current;
    }, targets[0].id);
  };

  const sync = () => {
    const hashId = window.location.hash.slice(1);
    const activeId = targets.some((target) => target.id === hashId) ? hashId : currentIdFromScroll();
    setActive(activeId);
  };

  let pending = false;
  const scheduleSync = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      sync();
    });
  };

  window.addEventListener("hashchange", sync);
  window.addEventListener("scroll", scheduleSync, { passive: true });
  sync();
}
