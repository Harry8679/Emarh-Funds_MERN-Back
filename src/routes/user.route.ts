import express, { Request, Response } from 'express';
import UserModel from '../models/user.model';

const router = express.Router();

// Interface pour le corps de la requête
interface RegisterRequestBody {
    email: string;
    password: string;
    [key: string]: any; // Permettre des propriétés supplémentaires si nécessaire
}

// Route pour l'inscription
router.post('/register', async (req: Request<any, any, RegisterRequestBody>, res: Response): Promise<void> => {
        try {
            // Vérifier si l'utilisateur existe déjà
            const user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }

            // Ajouter la logique pour créer un utilisateur ici
            // Exemple :
            // const newUser = new UserModel({ email: req.body.email, password: hashedPassword });
            // await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ message: (err as Error).message });
        }
    }
);

export default router;
