import { Request } from 'express';
import { User } from '../types/user.types'; // Assurez-vous du bon chemin

export class RequestUser extends Request {
    user?: User; // Déclarez ici que votre propriété user est de type User
}