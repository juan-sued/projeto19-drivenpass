import express, { Express } from 'express';
import 'express-async-errors';

import cors from 'cors';

import { handleApplicationErrors } from '@/middlewares';
import { connectDb, disconnectDB } from '@/config';
import { usersRouter } from '@/routes';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('users', usersRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;