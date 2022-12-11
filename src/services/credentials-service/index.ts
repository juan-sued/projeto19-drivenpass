import { RegisterCredential } from '@/protocols';
import credentialsRepository from '@/repositories/credentials-repository';

import bcrypt from 'bcrypt';

import { duplicatedCredentialsError } from './errors';

export async function createCredential({
  password,
  url,
  title,
  username,
  userId
}: RegisterCredential) {
  if (title) await validateUniqueNameCredentialOrFail(title);

  const hashedPassword = await bcrypt.hash(password, 12);

  return credentialsRepository.create({
    url,
    title,
    username,
    userId,
    password: hashedPassword
  });
}

async function validateUniqueNameCredentialOrFail(title: string) {
  const credentialsWithSameName = await credentialsRepository.findByTitle(title);

  if (credentialsWithSameName) {
    throw duplicatedCredentialsError();
  }
}

const credentialsService = {
  createCredential
};

export * from './errors';
export default credentialsService;
