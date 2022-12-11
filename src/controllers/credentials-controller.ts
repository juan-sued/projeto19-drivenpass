import credentialsService from '@/services/credentials-service';

import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function credentialsPost(req: Request, res: Response) {
  const { password, url, title, username } = req.body;
  const { userId } = res.locals;
  try {
    await credentialsService.createCredential({ password, url, title, username, userId });

    return res.status(httpStatus.CREATED);
  } catch (error: any) {
    if (error.name === 'DuplicatedCredentialError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
