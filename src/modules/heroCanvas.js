export function setupHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const labels = ["Goal", "Context", "Agent", "Eval", "Loop"];
  let width = 0;
  let height = 0;
  let frame = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.floor(rect.width * window.devicePixelRatio);
    height = Math.floor(rect.height * window.devicePixelRatio);
    canvas.width = width;
    canvas.height = height;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const draw = () => {
    const logicalWidth = width / window.devicePixelRatio;
    const logicalHeight = height / window.devicePixelRatio;
    context.clearRect(0, 0, logicalWidth, logicalHeight);
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--hero-bg").trim();
    context.fillRect(0, 0, logicalWidth, logicalHeight);

    const centerX = logicalWidth * 0.68;
    const centerY = logicalHeight * 0.48;
    const radius = Math.min(logicalWidth, logicalHeight) * 0.25;

    context.lineWidth = 1.2;
    context.strokeStyle = "rgba(45, 212, 191, 0.35)";
    context.beginPath();
    for (let i = 0; i < 7; i += 1) {
      const y = centerY - radius + i * (radius / 3);
      context.moveTo(centerX - radius * 1.3, y);
      context.lineTo(centerX + radius * 1.3, y + Math.sin(frame / 70 + i) * 18);
    }
    context.stroke();

    const points = labels.map((label, index) => {
      const angle = frame / 120 + index * ((Math.PI * 2) / labels.length) - Math.PI / 2;
      return {
        label,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius * 0.72,
      };
    });

    context.strokeStyle = "rgba(37, 99, 235, 0.38)";
    context.beginPath();
    points.forEach((point, index) => {
      const next = points[(index + 1) % points.length];
      context.moveTo(point.x, point.y);
      context.lineTo(next.x, next.y);
    });
    context.stroke();

    for (const [index, point] of points.entries()) {
      const pulse = 1 + Math.sin(frame / 24 + index) * 0.08;
      context.beginPath();
      context.fillStyle = index % 3 === 0 ? "#2dd4bf" : index % 3 === 1 ? "#f97316" : "#60a5fa";
      context.arc(point.x, point.y, 26 * pulse, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "#071314";
      context.font = "700 13px Inter, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(point.label, point.x, point.y);
    }

    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim();
    context.font = "600 15px Inter, sans-serif";
    context.fillText("AI 协同工作流", centerX, centerY + radius * 1.08);

    frame += 1;
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}
