import mongoose from "mongoose";
import { logger } from "../logging/logger";

const uri = "mongodb+srv://abdou:UeawXp23HKfOfZsp@cluster0.yy249vl.mongodb.net/"

mongoose.connect(uri,
    { 
    dbName: 'MerchantProduct'
    })
  .then(() => logger.info("database is ready now with db"))
  .catch(() => logger.error('Connection to MongoDB MerchantProduct failed !'));

export default mongoose.connection;