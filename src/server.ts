import express from 'express';
import dotenv from 'dotenv';
import connectMongoDB from './config/dbConnect';
import userRoute from './routes/user.route';

dotenv.config();

connectMongoDB();


const app = express();

// Middleware pour parser le JSON
app.use(express.json());

app.use('/api/v1/users', userRoute);

const port = process.env.PORT || 5060;

app.listen(port, () => console.log(`Server running at ${port}`));