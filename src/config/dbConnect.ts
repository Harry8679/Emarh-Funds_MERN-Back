import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
    console.log(process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {});
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB: ' + err);
    }
};

export default connectMongoDB;
