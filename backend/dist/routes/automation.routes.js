import { Hono } from 'hono';
import * as automationController from "../controllers/automationController.js";
const automationRoutes = new Hono();
automationRoutes.get('/flows', automationController.getFlows);
automationRoutes.get('/runs', automationController.getFlowRuns);
export default automationRoutes;
