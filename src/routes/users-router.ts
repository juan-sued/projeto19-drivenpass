import { Router } from 'express';

import { createUserSchema } from '@/schemas';

import { usersPost } from '@/controllers';
import { validateBody } from '@/middlewares';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), usersPost);

export { usersRouter };
