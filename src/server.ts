import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './config/dbConnect';

dotenv.config();

connectMongoDB();
// console.log('object')

const app = express();

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running at ${port}`));