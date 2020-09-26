import Joi from "@hapi/joi";

const loginParams = {
  username: Joi.string().required(),
  password: Joi.string().required(),
};
export const loginSchema = Joi.object(loginParams);
