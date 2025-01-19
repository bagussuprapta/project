import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages(),
  preferred_language: Joi.string().required().max(2),
});

export { registerUserValidation };
