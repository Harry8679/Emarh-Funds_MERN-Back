import { validationResult } from 'express-validator';
import UserModel from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserIdRequest } from '../../types/UserIdRequest';

/************* Register ********************/
export const register = async (req: Request, res: Response) => {
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

/************* Login ********************/
export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Comparer le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'defaultsecret', // Remplacez par une vraie clé secrète dans un fichier .env
            { expiresIn: '1h' } // Durée de validité du token
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
            },
        });
    } catch (err) {
        console.error('Error occurred during login:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

export const currentUser = async (req: UserIdRequest, res: Response) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        const userId = req.user.userId; // Maintenant TypeScript sait que userId existe
        res.status(200).json({ userId });
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};


