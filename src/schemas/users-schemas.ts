import { CreateUserParams } from '@/protocols';
import Joi from 'joi';

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required()
});
