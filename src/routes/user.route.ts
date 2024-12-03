import express from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/user.controller';

const router = express.Router();

router.post('/register',[body('email').isEmail().withMessage('Invalid email'), body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('name').notEmpty().withMessage('Name is required')], register);
        
router.post('/login', login);

export default router;
