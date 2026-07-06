import { setupCases } from "./modules/cases.js";
import { setupCopyButtons } from "./modules/copy.js";
import { setupHeroCanvas } from "./modules/heroCanvas.js";
import { setupPresentMode } from "./modules/presentMode.js";
import { setupReveal } from "./modules/reveal.js";
import { setupTaskCard } from "./modules/taskCard.js";
import { setupTerms } from "./modules/terms.js";
import { setupTheme } from "./modules/theme.js";

setupTheme();
setupPresentMode();
setupHeroCanvas();
setupReveal();
setupTerms();
setupCases();
setupTaskCard();
setupCopyButtons();
