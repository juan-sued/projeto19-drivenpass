import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findByTitle(title: string, select?: Prisma.CredentialSelect) {
  const params: Prisma.CredentialFindUniqueArgs = {
    where: {
      title
    }
  };

  if (select) {
    params.select = select;
  }

  return prisma.credential.findUnique(params);
}

async function create(data: Prisma.CredentialUncheckedCreateInput) {
  return prisma.credential.create({
    data
  });
}

const credentialsRepository = {
  findByTitle,
  create
};

export default credentialsRepository;
