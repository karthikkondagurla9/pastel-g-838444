import { Hono } from 'hono';
import * as kbController from '../controllers/kbController.ts';

const kbRoutes = new Hono();

kbRoutes.get('/items', kbController.getKBItems);
kbRoutes.post('/upload', kbController.uploadKBItem);
kbRoutes.delete('/items/:id', kbController.deleteKBItem);

export default kbRoutes;
