import { validationResult } from 'express-validator';
import UserModel from '../models/user.model';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

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