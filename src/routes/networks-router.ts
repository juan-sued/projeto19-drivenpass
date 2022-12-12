import { credentialDelete, credentialsGet, networkPost } from '@/controllers';
import { validateBody, authenticateToken, validateParams } from '@/middlewares';
import { networkSchema } from '@/schemas';
import { credentialsParamsSchema } from '@/schemas/credentialsParamsSchema';
import { Router } from 'express';

const networksRouter = Router();

networksRouter
  .all('/*', authenticateToken)
  .get('/', credentialsGet)
  .get('/:idCredential', validateParams(credentialsParamsSchema), credentialsGet)
  .post('/', validateBody(networkSchema), networkPost)
  .delete('/:idCredential', validateParams(credentialsParamsSchema), credentialDelete);

export { networksRouter };
