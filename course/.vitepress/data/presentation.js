export function clampScene(index, total) {
  if (!Number.isFinite(index) || total <= 0) return 0;
  return Math.min(Math.max(Math.trunc(index), 0), total - 1);
}

export function sceneFromSearch(search, total) {
  const raw = new URLSearchParams(search).get("scene");
  const oneBased = Number.parseInt(raw || "1", 10);
  return clampScene(Number.isFinite(oneBased) ? oneBased - 1 : 0, total);
}

export function searchWithScene(search, index) {
  const params = new URLSearchParams(search);
  params.set("scene", String(index + 1));
  return `?${params.toString()}`;
}

export function keyToAction(key) {
  return (
    {
      ArrowRight: "next",
      ArrowDown: "next",
      PageDown: "next",
      " ": "next",
      ArrowLeft: "previous",
      ArrowUp: "previous",
      PageUp: "previous",
      Home: "first",
      End: "last",
      f: "fullscreen",
      F: "fullscreen",
      o: "overview",
      O: "overview",
    }[key] || null
  );
}
