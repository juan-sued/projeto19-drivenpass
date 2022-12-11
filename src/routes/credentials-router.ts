import { credentialsPost } from '@/controllers';
import { validateBody, authenticateToken } from '@/middlewares';
import { credentialsSchema } from '@/schemas';
import { Router } from 'express';

const credentialsRouter = Router();

credentialsRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(credentialsSchema), credentialsPost);

export { credentialsRouter };
