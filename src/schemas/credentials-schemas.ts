import { RegisterCredential } from '@/protocols';
import Joi from 'joi';

export const credentialsSchema = Joi.object<RegisterCredential>({
  url: Joi.string().uri().trim().min(1).required(),
  password: Joi.string().min(1).required(),
  title: Joi.string().trim().min(1).required(),
  username: Joi.string().trim().min(1).required(),
  userId: Joi.number().min(1).required()
});
