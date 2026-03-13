import { Hono } from 'hono';
import * as supportController from "../controllers/supportController.js";
const supportRoutes = new Hono();
supportRoutes.get('/tickets', supportController.getTickets);
supportRoutes.get('/tickets/:id', supportController.getTicketById);
export default supportRoutes;
