import { RegisterNetwork } from '@/protocols';
import Joi from 'joi';

export const networkSchema = Joi.object<RegisterNetwork>({
  title: Joi.string().trim().min(1).required(),
  password: Joi.string().min(1).required(),
  network: Joi.string().trim().min(1).required()
});
