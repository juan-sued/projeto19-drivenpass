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

async function listNetworkById(userId: number, idNetwork: number) {
  const network = await validateNetworkOrFail(idNetwork);
  if (network.userId !== userId) throw forbiddenError();

  const result = {
    networkId: network.id,
    title: network.title,
    network: network.network,
    password: decriptPassword(network.password)
  };

  return result;
}

async function listNetworks(userId: number) {
  const networks = await networksRepository.findAllNetworks(userId);
  console.log(userId);
  const listNetworks = [];

  for (const network of networks) {
    listNetworks.push({
      networkId: network.id,
      title: network.title,
      network: network.network,
      password: decriptPassword(network.password)
    });
  }

  return listNetworks;
}

async function deleteNetwork(userId: number, idNetwork: number) {
  const network = await validateNetworkOrFail(idNetwork);

  if (network.userId !== userId) throw forbiddenError();

  return networksRepository.deleteCredential(idNetwork);
}

//============= UTILS ===============//

function decriptPassword(hashedPassword: string) {
  const decryptPassword = cryptr.decrypt(hashedPassword);
  return decryptPassword;
}

async function validateNetworkOrFail(idNetwork: number) {
  const network = await networksRepository.findByIdNetwork(idNetwork);

  if (!network) {
    throw notFoundError();
  }
  return network;
}

const networksService = {
  createNetwork,
  listNetworkById,
  listNetworks,
  deleteNetwork
};

export * from './errors';
export default networksService;
