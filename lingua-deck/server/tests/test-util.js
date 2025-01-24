import { prismaClient } from "../src/apps/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async (username = "test") => {
  await prismaClient.user.deleteMany({
    where: {
      username: username,
    },
  });
};

export const createTestUser = async () => {
  return await prismaClient.user.create({
    data: {
      username: "test",
      email: "test@test.com",
      password: await bcrypt.hash("mypassword", 10),
      preferred_language: "en",
      token: "test",
    },
  });
};

export const removeTodayTestFlashcard = async (term = "test") => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  await prismaClient.flashcard.deleteMany({
    where: {
      created_at: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
};

export const createTestFlashcard = async () => {
  const testUser = await createTestUser();

  await prismaClient.flashcard.create({
    data: {
      user_id: testUser.user_id,
      term: "test",
      definition: "test",
      level: "beginner",
      category: "test test",
      part_of_speech: "noun",
      example_sentence: "test",
    },
  });
};

export const getTestFlashcard = async () => {
  return await prismaClient.flashcard.findFirst({
    where: {
      term: "test",
    },
  });
};
