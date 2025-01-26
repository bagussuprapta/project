import { validator } from "../validations/validator.js";
import { createFlashcardValidation, getFlashcardQueryValidation, getFlashcardValidation } from "../validations/flashcardValidation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseError } from "../errors/responseError.js";
import csvParser from "csv-parser";
import { Readable } from "stream";
import stripBom from "strip-bom";

const create = async (user, request) => {
  request.user_id = user.user_id;
  const validatedFlashcard = validator(createFlashcardValidation, request);
  return await prismaClient.flashcard.create({
    data: validatedFlashcard,
  });
};

const importFlashcard = async (user, request) => {
  if (!request.file) {
    throw new ResponseError(400, "no file uploaded");
  }

  const fileBuffer = request.file.buffer;
  const cleanedString = stripBom(fileBuffer.toString("utf-8"));
  const cleanedBuffer = Buffer.from(cleanedString, "utf-8");
  const readableStream = Readable.from(cleanedBuffer);

  const results = [];
  await new Promise((resolve, reject) => {
    readableStream
      .pipe(csvParser({ separator: "," }))
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        reject(new ResponseError(400, "error parsing csv"));
      });
  });

  const approvedFlashcards = [];
  results.map((result) => {
    result.user_id = user.user_id;
    const validatedFlashcard = validator(createFlashcardValidation, result);
    approvedFlashcards.push(validatedFlashcard);
  });

  return await prismaClient.flashcard.createMany({
    data: approvedFlashcards,
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
    select: {
      card_id: true,
      definition: true,
      level: true,
      category: true,
      part_of_speech: true,
      example_sentence: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
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

export default { create, importFlashcard, get, getAll };
