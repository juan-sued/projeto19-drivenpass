import { forbiddenError, notFoundError } from '@/errors';
import { RegisterCredential, RegisterNetwork } from '@/protocols';
import credentialsRepository from '@/repositories/credentials-repository';
import networksRepository from '@/repositories/networks-repository';
import Cryptr from 'cryptr';
import { duplicatedNetworkError } from './errors';

const cryptr = new Cryptr(process.env.SECRET_KEY || '!5S5G6$1AE@');

async function createNetwork({ password, network, title, userId }: RegisterNetwork) {
  const hashedPassword = cryptr.encrypt(password);

  return networksRepository.create({
    network,
    title,
    userId,
    password: hashedPassword
  });
}

async function listNetworkById(userId: number, idCredential: number) {
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

async function listNetworks(userId: number) {
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

async function deleteNetwork(userId: number, idCredential: number) {
  const credential = await validateCredentialOrFail(idCredential);

  if (credential.userId !== userId) throw forbiddenError();

  return credentialsRepository.deleteCredential(idCredential);
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
    throw duplicatedNetworkError();
  }
}

async function validateCredentialOrFail(idCredential: number) {
  const credential = await credentialsRepository.findByIdCredential(idCredential);

  if (!credential) {
    throw notFoundError();
  }
  return credential;
}

const networksService = {
  createNetwork,
  listNetworkById,
  listNetworks,
  deleteNetwork
};

export * from './errors';
export default networksService;
