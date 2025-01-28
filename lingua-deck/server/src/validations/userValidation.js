import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(15)
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base": "username must contain only letters",
    }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages(),
  preferred_language: Joi.string()
    .required()
    .max(2)
    .pattern(/^[A-Za-z]{1,2}$/)
    .messages({
      "string.pattern.base": "preferred language must contain only letters",
    }),
});

const loginUserValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(15)
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base": "username must contain only letters",
    }),
  password: Joi.string().min(6).required().messages(),
});

const getUserValidation = Joi.object({
  user_id: Joi.number(),
  username: Joi.string().min(3).max(50).required(),
});

const updateUserValidation = Joi.object({
  user_id: Joi.number().required(),
  username: Joi.string()
    .min(3)
    .max(50)
    .optional()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base": "username must contain only letters",
    }),
  email: Joi.string().email().optional(),
  preferred_language: Joi.string()
    .optional()
    .max(2)
    .pattern(/^[A-Za-z]{1,2}$/)
    .messages({
      "string.pattern.base": "preferred language must contain only letters",
    }),
});

export { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation };
