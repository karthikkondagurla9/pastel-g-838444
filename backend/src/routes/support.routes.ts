import { Hono } from 'hono';
import * as supportController from '../controllers/supportController.ts';

const supportRoutes = new Hono();

supportRoutes.get('/tickets', supportController.getTickets);
supportRoutes.get('/tickets/:id', supportController.getTicketById);

export default supportRoutes;
