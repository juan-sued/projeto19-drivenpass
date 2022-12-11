import { ApplicationError } from '@/protocols';

export function duplicatedCredentialsError(): ApplicationError {
  return {
    name: 'DuplicatedCredentialsError',
    message: 'There is already an credential with given name'
  };
}
