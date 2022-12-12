import { invalidDataError } from '@/errors';
import credentialsService from '@/services/credentials-service';
import { Credential } from '@prisma/client';

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
export async function credentialsGet(req: Request, res: Response) {
  const { userId } = res.locals;
  const idCredential = Number(req.params.idCredential);

  try {
    let resultCredentials: any = [];

    if (idCredential) {
      const result = await credentialsService.listCredentialById(userId, idCredential);
      resultCredentials = result;
    } else {
      const credentials = await credentialsService.listAllCredentials(userId);
      resultCredentials = credentials;
    }

    return res.status(httpStatus.OK).send(resultCredentials);
  } catch (error: any) {
    if (error.name === 'ConflictError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function credentialDelete(req: Request, res: Response) {
  const { userId } = res.locals;
  const idCredential = Number(req.params.idCredential);

  try {
    if (!idCredential) invalidDataError(['id inexistent']);

    await credentialsService.deleteCredential(userId, idCredential);

    return res.sendStatus(httpStatus.OK);
  } catch (error: any) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
