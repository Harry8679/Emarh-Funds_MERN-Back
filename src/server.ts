import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './config/dbConnect';
import userRoute from './routes/user.route';

dotenv.config();

connectMongoDB();


const app = express();

app.use('/api/v1', userRoute);

const port = process.env.PORT || 5060;

app.listen(port, () => console.log(`Server running at ${port}`));