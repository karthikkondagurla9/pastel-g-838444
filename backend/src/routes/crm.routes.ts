import { Hono } from 'hono';
import * as crmController from '../controllers/crmController.ts';

const crmRoutes = new Hono();

crmRoutes.get('/dashboard/stats', crmController.getDashboardStats);
crmRoutes.get('/customers', crmController.getCustomers);
crmRoutes.get('/customers/:id', crmController.getCustomerById);
crmRoutes.get('/customers/:id/orders', crmController.getCustomerOrders);

export default crmRoutes;
