import { User } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type CreateUserParams = Pick<User, 'email' | 'password'>;

//Regra de Negócio

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};
