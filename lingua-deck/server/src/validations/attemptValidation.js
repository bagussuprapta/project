import Joi from "joi";

const attemptFlashcardValidation = Joi.object({
  term: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .message("term must be a single word"),
});

export { attemptFlashcardValidation };
