import { validator } from "../validations/validator.js";
import { createFlashcardValidation } from "../validations/flashcardValidation.js";
import { prismaClient } from "../apps/database.js";

const create = async (user, request) => {
  request.user_id = user.user_id;
  const validatedFlashcard = validator(createFlashcardValidation, request);
  return await prismaClient.flashcard.create({
    data: validatedFlashcard,
  });
};

export default { create };
