import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running at ${port}`));