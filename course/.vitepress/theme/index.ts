import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import AdvancedTrack from "./components/AdvancedTrack.vue";
import BoundaryBoard from "./components/BoundaryBoard.vue";
import CollaborationFlow from "./components/CollaborationFlow.vue";
import CourseRouteMap from "./components/CourseRouteMap.vue";
import KnowledgeAtlas from "./components/KnowledgeAtlas.vue";
import Layout from "./Layout.vue";
import ScenarioFrame from "./components/ScenarioFrame.vue";
import TaskCardLab from "./components/TaskCardLab.vue";
import TemplateLibrary from "./components/TemplateLibrary.vue";
import ToolLandscape from "./components/ToolLandscape.vue";
import "vitepress/dist/client/theme-default/styles/vars.css";
import "./styles/tokens.css";
import "./styles/docs.css";
import "./styles/components.css";
import "./styles/instructor.css";
import "./styles/presentation.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("AdvancedTrack", AdvancedTrack);
    app.component("BoundaryBoard", BoundaryBoard);
    app.component("CollaborationFlow", CollaborationFlow);
    app.component("CourseRouteMap", CourseRouteMap);
    app.component("KnowledgeAtlas", KnowledgeAtlas);
    app.component("ScenarioFrame", ScenarioFrame);
    app.component("TaskCardLab", TaskCardLab);
    app.component("TemplateLibrary", TemplateLibrary);
    app.component("ToolLandscape", ToolLandscape);
  },
} satisfies Theme;
