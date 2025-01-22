import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages(),
  preferred_language: Joi.string().required().max(2),
});

const loginUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required().messages(),
});

const getUserValidation = Joi.object({
  user_id: Joi.number(),
  username: Joi.string().min(3).max(50).required(),
});

const updateUserValidation = Joi.object({
  user_id: Joi.number().required(),
  username: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  preferred_language: Joi.string().optional().max(2),
});

export { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation };
