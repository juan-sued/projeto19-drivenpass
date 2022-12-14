import { Credential, Network, User } from '@prisma/client';

//========= create user types ===========//

export type CreateUserParams = Pick<User, 'email' | 'password'>;

//========= sign-in types ===========//

export type SignInParams = Pick<User, 'email' | 'password'>;

export type SignInResult = {
  token: string;
};

export type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

//========= credentials types ===========//

export type RegisterCredential = Omit<Credential, 'id'>;

export type RegisterNetwork = Omit<Network, 'id'>;

//========= network types ========//

//========= errors types ===========//

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type ApplicationError = {
  name: string;
  message: string;
};
