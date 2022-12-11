import { GetUserOrFailResult, SignInParams, SignInResult } from '@/protocols';
import userRepository from '@/repositories/user-repository';
import { exclude } from '@/utils/prisma-utils';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { invalidCredentialsError } from './errors';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createToken(user.id);

  return { token };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true
  });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createToken(userId: number) {
  const SECRET: jwt.Secret = process.env.SECRET_KEY || '!5S5G6$1AE@';
  const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';
  const payload = { id: userId };

  return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

const authenticationService = {
  signIn
};

export default authenticationService;
export * from './errors';
