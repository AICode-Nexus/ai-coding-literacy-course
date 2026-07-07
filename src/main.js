import { setupCases } from "./modules/cases.js";
import { setupCopyButtons } from "./modules/copy.js";
import { setupHeroCanvas } from "./modules/heroCanvas.js";
import { setupNav } from "./modules/nav.js";
import { setupPresentMode } from "./modules/presentMode.js";
import { setupReveal } from "./modules/reveal.js";
import { setupTaskCard } from "./modules/taskCard.js";
import { setupTerms } from "./modules/terms.js";
import { setupTheme } from "./modules/theme.js";

setupTheme();
setupNav();
setupPresentMode();
setupHeroCanvas();
setupReveal();
setupTerms();
setupCases();
setupTaskCard();
setupCopyButtons();
