import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import UserModel from '../models/user.model';

const router = express.Router();

// Interface pour le corps de la requête
interface RegisterRequestBody {
    email: string;
    password: string;
}

// Route pour l'inscription
// router.post('/register', async (req: Request, res: Response) => {
//     console.log(req.body);
//     res.status(200).json({ message: 'Validation skipped for testing' });
// });

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('name').notEmpty().withMessage('Name is required'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password, name } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ email, password: hashedPassword, name });

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (err) {
            console.error('Error occurred:', err);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
);




export default router;
