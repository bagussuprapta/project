import Joi from "joi";

const createFlashcardValidation = Joi.object({
  user_id: Joi.number().required(),
  term: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+(, ?[a-zA-Z]+)*$/) // Hanya huruf dan koma
    .messages({
      "string.pattern.base": "term must only contain letters and commas, e.g., 'apple, basket, morning'.",
      "string.empty": "term cannot be empty.",
    }),
  definition: Joi.string().required().max(100),
  level: Joi.valid("beginner", "intermediate", "advance").required(),
  category: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      const words = value.split(" ");
      if (words.some((word) => !/^[a-zA-Z]+$/.test(word))) {
        return helpers.message("category must contain only letters.");
      }
      if (words.length > 2) {
        return helpers.message("category can have at most 2 words.");
      }
      const totalLength = words.reduce((sum, word) => sum + word.length, 0);
      if (totalLength > 15) {
        return helpers.message("category length must not exceed 15 characters.");
      }
      return value;
    })
    .messages({
      "string.empty": "category cannot be empty.",
    }),
  part_of_speech: Joi.string().valid("noun", "verb", "adjective", "adverb", "preposition").required(),
  example_sentence: Joi.string().optional().allow(""),
});

export { createFlashcardValidation };
