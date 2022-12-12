import { forbiddenError, notFoundError } from '@/errors';
import { RegisterCredential } from '@/protocols';
import credentialsRepository from '@/repositories/credentials-repository';
import Cryptr from 'cryptr';
import { duplicatedCredentialsError } from './errors';

const cryptr = new Cryptr(process.env.SECRET_KEY || '!5S5G6$1AE@');

async function createCredential({
  password,
  url,
  title,
  username,
  userId
}: RegisterCredential) {
  await validateUniqueNameCredentialOrFail(title, userId);

  const hashedPassword = cryptr.encrypt(password);

  return credentialsRepository.create({
    url,
    title,
    username,
    userId,
    password: hashedPassword
  });
}

async function listCredentialById(userId: number, idCredential: number) {
  const credential = await validateCredentialOrFail(idCredential);

  if (credential.userId !== userId) throw forbiddenError();

  const result = {
    credentialId: credential.id,
    title: credential.title,
    username: credential.username,
    url: credential.url,
    password: decriptPassword(credential.password)
  };

  return result;
}

async function listAllCredentials(userId: number) {
  const credentials = await credentialsRepository.findAllCredentials(userId);

  const listCredentials = [];

  for (const credential of credentials) {
    listCredentials.push({
      credentialId: credential.id,
      title: credential.title,
      username: credential.username,
      url: credential.url,
      password: decriptPassword(credential.password)
    });
  }

  return listCredentials;
}

//============= UTILS ===============//
function decriptPassword(hashedPassword: string) {
  const decryptPassword = cryptr.decrypt(hashedPassword);
  return decryptPassword;
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

async function validateCredentialOrFail(idCredential: number) {
  const credential = await credentialsRepository.findByIdCredential(idCredential);

  if (!credential) {
    throw notFoundError();
  }
  return credential;
}

const credentialsService = {
  createCredential,
  listCredentialById,
  listAllCredentials
};

export * from './errors';
export default credentialsService;
