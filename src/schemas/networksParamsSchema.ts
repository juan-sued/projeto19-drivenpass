import Joi from 'joi';

export const networksParamsSchema = Joi.object<{ idNetwork: number }>({
  idNetwork: Joi.number().min(1).required()
});
