import { loginUserValidation, registerUserValidation } from "../validations/userValidation.js";
import { validator } from "../validations/validator.js";
import { prismaClient } from "../apps/database.js";
import { ResponseError } from "../errors/responseError.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

const login = async (request) => {
  const validatedLoginRequest = validator(loginUserValidation, request);
  const queriedUser = await prismaClient.user.findUnique({
    where: {
      username: validatedLoginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });
  if (!queriedUser) {
    throw new ResponseError(401, "username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(validatedLoginRequest.password, queriedUser.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "username or password wrong");
  }

  const token = uuid().toString();
  return await prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: queriedUser.username,
    },
    select: {
      token: true,
    },
  });
};

export default { register, login };
