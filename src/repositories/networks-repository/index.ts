import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

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

async function deleteNetwork(idNetwork: number) {
  return prisma.network.delete({
    where: { id: idNetwork }
  });
}

const networksRepository = {
  create,
  findAllNetworks,
  findByIdNetwork,
  deleteNetwork
};

export default networksRepository;
