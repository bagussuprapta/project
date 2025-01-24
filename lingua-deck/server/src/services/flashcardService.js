import { validator } from "../validations/validator.js";
import { createFlashcardValidation, getFlashcardQueryValidation, getFlashcardValidation } from "../validations/flashcardValidation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseError } from "../errors/responseError.js";

const create = async (user, request) => {
  request.user_id = user.user_id;
  const validatedFlashcard = validator(createFlashcardValidation, request);
  return await prismaClient.flashcard.create({
    data: validatedFlashcard,
  });
};

const get = async (request) => {
  const validatedGetFlashcard = validator(getFlashcardValidation, { card_id: request.card_id });
  const queriedFlashcard = await prismaClient.flashcard.findFirst({
    where: {
      card_id: validatedGetFlashcard.card_id,
    },
  });

  if (!queriedFlashcard) {
    throw new ResponseError(404, "flashcard is not found");
  }

  return queriedFlashcard;
};

const getAll = async (query) => {
  const { page, pageSize } = validator(getFlashcardQueryValidation, query);
  const skip = (page - 1) * pageSize;

  const queriedFlashcard = await prismaClient.flashcard.findMany({
    skip,
    take: pageSize,
  });
  const totalFlashcard = await prismaClient.flashcard.count();
  return {
    data: queriedFlashcard,
    meta: {
      currentPage: page,
      pageSize: pageSize,
      totalData: totalFlashcard,
      totalPages: Math.ceil(totalFlashcard / pageSize),
    },
  };
};

export default { create, get, getAll };
