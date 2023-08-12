import { Request, Response, NextFunction } from "express";
import MerchantProduct from "../models/merchantProduct.model";
import { logger } from "../logging/logger"

export const create = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {productId: req.body.productId, merchantId: req.body.merchantId};
        const merchantProduct = await MerchantProduct.findOne(filter).select("merchantId productId").lean()
        if (merchantProduct) {
            //Aller requêter le microservice Product et voir si le produit est vérifier si c'est alors renvoyer le message produit disponible, sinon faire une demande de vérification du produit
            res.json({
                status: "success",
                data: { ...merchantProduct },
                message: 'Product already exist',
            });
            logger.info("Created failed, Product already available");
        } else {
            
            const newMerchantProduct = new MerchantProduct(req.body);

            const savedMerchantProduct = await newMerchantProduct.save();
            res.json({
                status: "success",
                data: { ...savedMerchantProduct },
                message: 'Product created Succesfully',
            });
            logger.info("New product created", newMerchantProduct.id);
        }
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }

};


export const findOne = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const merchantProduct = await MerchantProduct.findOne(filter);
        res.json({
            status: "success",
            data: { ...merchantProduct },
            message: 'Product found Succesfully',
        });
        logger.info("Product found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }
};

export const getByMerchantId = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {merchantId: req.params.merchantId};
        const product = await MerchantProduct.find(filter);
        res.json({
            status: "success",
            data: { ...product },
            message: 'Data found Succesfully',
        });
        logger.info("Data found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }
};

export const getByProductId = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {productId: req.params.productId};
        const product = await MerchantProduct.find(filter);
        res.json({
            status: "success",
            data: { ...product },
            message: 'Data found Succesfully',
        });
        logger.info("Data found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }
};

export const getSpecificMerchantProduct = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {productId: req.body.productId, merchantId: req.body.merchantId};
        const product = await MerchantProduct.find(filter);
        res.json({
            status: "success",
            data: { ...product },
            message: 'Data found Succesfully',
        });
        logger.info("Data found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        // const update = {updateAt: Date.now()}
        // const order = await Product.findOneAndUpdate(filter, req.body);
        // const orderU = await Product.findOneAndUpdate(filter, update);
        const product = await MerchantProduct.updateOne(filter, { ...req.body, _id: req.params.id, updateAt: Date.now()});
        res.json({
            status: "success",
            data: { ...product },
            message: 'Product updated Succesfully',
        });
        logger.info("Product updated Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }   
};

export const all = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const allProducts = await MerchantProduct.find();
        res.json({
            status: "success",
            data: { ...allProducts },
            message: 'Data found Succesfully',
        });
        logger.info("Data found Succesfully");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }   
};

export const deleteAsk = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const deletedProduct = await MerchantProduct.findOne(filter);
        const product = await MerchantProduct.updateOne(filter, { deleted: true, updateAt: Date.now()});
        res.json({
            status: "success",
            data: { ...product },
            message: 'Your request will be taken into account',
        });
        logger.info("Ask to delete product ", req.params.id);
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }   
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const deletedProduct = await MerchantProduct.find(filter);
        if (deletedProduct?.length == 1) { 
            const deleteProduct = await MerchantProduct.deleteOne(filter);
            res.json({
                status: "success",
                data: { ...deleteProduct },
                message: 'Product deleted Succesfully, you can no longer retrieve this data',
            });
            logger.info("Product deleted succesfully");
        } else {
            res.json({
                status: "success",
                data: { ...deletedProduct },
                message: 'Please request deletion before taking this action.',
            })
            logger.warn("Action not authorized for this user, user tries to delete a product before applying");
        }
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }   
};

export const deleteOneSudo = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const filter = {_id: req.params.id};
        const deleteProduct = await MerchantProduct.deleteOne(filter);
        res.json({
            status: "success",
            data: { ...deleteProduct },
            message: 'Product deleted Succesfully with sudo command, you can no longer retrieve this data',
        });
        logger.warn("Product deleted succesfully by using sudoDelete");
    } catch(error) {
        logger.error("Erreur ",error);
        next(error);
    }   
};

// export const historyUser = async (req: Request, res: Response, next: NextFunction) =>{
//     try{
//         const filter = {user: req.params.user};
//         const product = await Product.find(filter);
//         res.json({
//             status: "success",
//             data: { ...product },
//             message: 'history products found Succesfully',
//         });
//     } catch(error) {
//         next(error);
//     }   
// };