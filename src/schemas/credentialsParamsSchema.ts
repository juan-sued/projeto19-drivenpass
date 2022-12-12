import Joi from 'joi';

export const credentialsParamsSchema = Joi.object<{ idCredential: number }>({
  idCredential: Joi.number().min(1).required()
});
