import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import AdvancedTrack from "./components/AdvancedTrack.vue";
import BoundaryBoard from "./components/BoundaryBoard.vue";
import CaseTheatre from "./components/CaseTheatre.vue";
import CollaborationFlow from "./components/CollaborationFlow.vue";
import Layout from "./Layout.vue";
import TaskCardLab from "./components/TaskCardLab.vue";
import "vitepress/dist/client/theme-default/styles/vars.css";
import "./styles/tokens.css";
import "./styles/docs.css";
import "./styles/components.css";
import "./styles/presentation.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("AdvancedTrack", AdvancedTrack);
    app.component("BoundaryBoard", BoundaryBoard);
    app.component("CaseTheatre", CaseTheatre);
    app.component("CollaborationFlow", CollaborationFlow);
    app.component("TaskCardLab", TaskCardLab);
  },
} satisfies Theme;
