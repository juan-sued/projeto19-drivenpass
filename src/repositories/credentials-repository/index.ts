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

async function create(data: Prisma.CredentialUncheckedCreateInput) {
  return prisma.credential.create({
    data
  });
}

const credentialsRepository = {
  findByTitleAnduserId,
  create
};

export default credentialsRepository;
