import { Router } from 'express';
import * as controllers from '../../controllers/merchantProduct.controllers';

const routes = Router();
// api/roles
routes.route('/all').get(controllers.all);
routes.route('/create').post(controllers.create);
routes.route('/findOne/:id').get(controllers.getById);
routes.route('/getByMerchantId/:merchantId').get(controllers.getByMerchantId);
routes.route('/getByProductId/:productId').get(controllers.getByProductId);
routes.route('/getSpecificMerchantProduct/:merchantId').get(controllers.getSpecificMerchantProduct);
routes.route('/updateOne/:id').patch(controllers.updateOne);
routes.route('/deleteAsk/:id').patch(controllers.deleteAsk);
routes.route('/deleteOne/:id').patch(controllers.deleteOne);
routes.route('/sudoDeleteOne/:id').patch(controllers.deleteOneSudo);

export default routes;