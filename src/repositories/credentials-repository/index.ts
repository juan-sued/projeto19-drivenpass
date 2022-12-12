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

async function findAllCredentials(userId: number, select?: Prisma.CredentialSelect) {
  const params: Prisma.CredentialFindManyArgs = {
    where: {
      userId
    }
  };

  if (select) {
    params.select = select;
  }

  return prisma.credential.findMany(params);
}

async function findByIdCredential(
  idCredential: number,
  userId?: number,
  select?: Prisma.CredentialSelect
) {
  const params: Prisma.CredentialFindFirstArgs = {
    where: {
      id: idCredential,
      userId
    }
  };

  if (select) {
    params.select = select;
  }

  return prisma.credential.findFirst(params);
}

async function create(data: Prisma.CredentialUncheckedCreateInput) {
  return prisma.credential.create({
    data
  });
}

const credentialsRepository = {
  findByTitleAnduserId,
  create,
  findAllCredentials,
  findByIdCredential
};

export default credentialsRepository;
