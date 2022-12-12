import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findByTitleAnduserId(
  title: string,
  userId: number,
  select?: Prisma.CredentialSelect
) {
  const params: Prisma.CredentialFindFirstArgs = {
    where: {
      title,
      userId
    }
  };

  if (select) {
    params.select = select;
  }

  return prisma.credential.findFirst(params);
}

async function findAllNetworks(userId: number, select?: Prisma.NetworkSelect) {
  const params: Prisma.NetworkFindManyArgs = {
    where: {
      userId
    }
  };

  if (select) {
    params.select = select;
  }

  return prisma.network.findMany(params);
}

async function findByIdNetwork(
  idNetwork: number,
  userId?: number,
  select?: Prisma.NetworkSelect
) {
  const params: Prisma.NetworkFindFirstArgs = {
    where: {
      id: idNetwork,
      userId
    }
  };

  if (select) {
    params.select = select;
  }

  return prisma.network.findFirst(params);
}

async function create(data: Prisma.NetworkUncheckedCreateInput) {
  return prisma.network.create({
    data
  });
}

async function deleteCredential(idCredential: number) {
  return prisma.credential.delete({
    where: { id: idCredential }
  });
}

const networksRepository = {
  findByTitleAnduserId,
  create,
  findAllNetworks,
  findByIdNetwork,
  deleteCredential
};

export default networksRepository;
