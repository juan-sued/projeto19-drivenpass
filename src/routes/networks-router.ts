import { credentialDelete, networkPost, networksGet } from '@/controllers';
import { validateBody, authenticateToken, validateParams } from '@/middlewares';
import { networkSchema } from '@/schemas';

import { networksParamsSchema } from '@/schemas/networksParamsSchema';
import { Router } from 'express';

const networksRouter = Router();

networksRouter
  .all('/*', authenticateToken)
  .get('/', networksGet)
  .get('/:idNetwork', validateParams(networksParamsSchema), networksGet)
  .post('/', validateBody(networkSchema), networkPost)
  .delete('/:idNetwork', validateParams(networksParamsSchema), credentialDelete);

export { networksRouter };
