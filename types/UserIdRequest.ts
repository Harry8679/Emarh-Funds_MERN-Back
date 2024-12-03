import { Request } from 'express';

export interface UserIdRequest extends Request {
    user?: { userId: string }; // Ajoutez d'autres propriétés si nécessaire
}
