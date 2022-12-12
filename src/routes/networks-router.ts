import { networkdelete, networkPost, networksGet } from '@/controllers';
import { validateBody, authenticateToken, validateParams } from '@/middlewares';
import { networkSchema, networksParamsSchema } from '@/schemas';

import { Router } from 'express';

const networksRouter = Router();

networksRouter
  .all('/*', authenticateToken)
  .get('/', networksGet)
  .get('/:idNetwork', validateParams(networksParamsSchema), networksGet)
  .post('/', validateBody(networkSchema), networkPost)
  .delete('/:idNetwork', validateParams(networksParamsSchema), networkdelete);

export { networksRouter };
