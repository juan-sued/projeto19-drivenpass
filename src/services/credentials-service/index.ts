import { RegisterCredential } from '@/protocols';
import credentialsRepository from '@/repositories/credentials-repository';

import bcrypt from 'bcrypt';

import Cryptr from 'cryptr';

import { duplicatedCredentialsError } from './errors';

export async function createCredential({
  password,
  url,
  title,
  username,
  userId
}: RegisterCredential) {
  await validateUniqueNameCredentialOrFail(title, userId);

  const cryptr = new Cryptr(process.env.SECRET_KEY || '!5S5G6$1AE@');

  const hashedPassword = cryptr.encrypt(password);

  return credentialsRepository.create({
    url,
    title,
    username,
    userId,
    password: hashedPassword
  });
}

async function validateUniqueNameCredentialOrFail(title: string, userId: number) {
  const credentialsWithSameName = await credentialsRepository.findByTitleAnduserId(
    title,
    userId
  );

  if (credentialsWithSameName) {
    throw duplicatedCredentialsError();
  }
}

const credentialsService = {
  createCredential
};

export * from './errors';
export default credentialsService;
