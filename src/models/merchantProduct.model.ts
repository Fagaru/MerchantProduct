import mongoose from 'mongoose'

const MerchantProduct = mongoose.model( 
    "MerchantProduct",
    new mongoose.Schema({
        id: {
            type: String,
            required: true
        },
        merchantId: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: false
        },
        quantity: {
            type: Number,
            required: false
        },
        qrCode: {
            type: String,
            required: false
        },
        verified: {
            type: Boolean,
            default: false
        },
        deleted: {
            type: Boolean,
            default: false,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
        updateAt: {
            type: Date,
            required: false
        },
        deletedAt: {
            type: Date,
            required: false
        },
    })
)

export default MerchantProduct;
