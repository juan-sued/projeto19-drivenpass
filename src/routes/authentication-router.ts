import { singInPost } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';
import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter.post('/', validateBody(signInSchema), singInPost);

export { authenticationRouter };
