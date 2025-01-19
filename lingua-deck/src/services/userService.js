import { registerUserValidation } from "../validations/userValidation.js";
import { validator } from "../validations/validator.js";
import { prismaClient } from "../apps/database.js";
import { ResponseError } from "../errors/responseError.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validator(registerUserValidation, request);
  const countUser = await prismaClient.user.count({
    where: {
      OR: [{ username: user.username }, { email: user.email }],
    },
  });
  if (countUser === 1) {
    throw new ResponseError(409, "username or email not available");
  }
  user.password = await bcrypt.hash(user.password, 10);
  return await prismaClient.user.create({
    data: user,
    select: {
      username: true,
    },
  });
};

export default { register };
