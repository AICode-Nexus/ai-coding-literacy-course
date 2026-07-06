import { collaborationSteps, sevenDayTraining } from "./workshop.js";

export { collaborationSteps, sevenDayTraining };

export const sevenDayPlan = sevenDayTraining.map(
  (day) => `第 ${day.day} 天：${day.task}`,
);
