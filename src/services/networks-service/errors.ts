import { ApplicationError } from '@/protocols';

export function duplicatedNetworkError(): ApplicationError {
  return {
    name: 'DuplicatedNetworkError',
    message: 'There is already an credential with given name'
  };
}
