import { Request } from 'express';

export class RequestUser extends Request {
    user?: User; // Ajoutez ici la propriété spécifique à votre utilisateur
}
