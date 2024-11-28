import express from 'express';
import UserModel from '../models/user.model';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        // Check if the user has already registered
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;