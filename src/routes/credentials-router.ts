import { credentialsPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { credentialsSchema } from '@/schemas';
import { Router } from 'express';

const credentialsRouter = Router();

credentialsRouter.post('/', validateBody(credentialsSchema), credentialsPost);

export { credentialsRouter };
