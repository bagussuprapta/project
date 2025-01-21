import { prismaClient } from "../src/apps/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      email: "test@test.com",
      password: await bcrypt.hash("mypassword", 10),
      preferred_language: "en",
      token: "test",
    },
  });
};
