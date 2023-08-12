import { Router } from 'express';
import merchantProductsRoutes from './api/merchantProduct.routes';
const routes = Router();

routes.use('/merchant-products', merchantProductsRoutes);

export default routes;