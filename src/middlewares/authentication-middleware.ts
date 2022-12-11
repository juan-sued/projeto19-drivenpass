import { NextFunction, Request, response, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';

import { unauthorizedError } from '@/errors';
import { prisma } from '@/config';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(' ')[1];
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const SECRET: jwt.Secret = process.env.SECRET_KEY || '!5S5G6$1AE@';

    const { id } = jwt.verify(token, SECRET) as JWTPayload;

    res.locals.userId = id;

    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

type JWTPayload = {
  id: number;
};
