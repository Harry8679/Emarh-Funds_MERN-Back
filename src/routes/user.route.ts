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
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req: Request<any, any, RegisterRequestBody>, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body;

        try {
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            // Hachage du mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Création de l'utilisateur
            await UserModel.create({
                email,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
);

export default router;
