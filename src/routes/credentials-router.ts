import { credentialsGet, credentialsPost } from '@/controllers';
import { validateBody, authenticateToken, validateParams } from '@/middlewares';
import { credentialsSchema } from '@/schemas';
import { credentialsParamsSchema } from '@/schemas/credentialsParamsSchema';
import { Router } from 'express';

const credentialsRouter = Router();

credentialsRouter
  .all('/*', authenticateToken)
  .get('/', credentialsGet)
  .get('/:idCredential', validateParams(credentialsParamsSchema), credentialsGet)
  .post('/', validateBody(credentialsSchema), credentialsPost);

export { credentialsRouter };
