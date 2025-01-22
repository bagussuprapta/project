import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validations/userValidation.js";
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

const get = async (request) => {
  const validatedGetRequest = validator(getUserValidation, request);
  const queriedUser = await prismaClient.user.findUnique({
    where: {
      user_id: validatedGetRequest.user_id,
    },
    select: {
      username: true,
      email: true,
      preferred_language: true,
    },
  });

  if (!queriedUser) {
    throw new ResponseError(404, "user is not found");
  }

  return queriedUser;
};

const update = async (request) => {
  const validatedUpdateRequest = validator(updateUserValidation, request);

  const countedUser = await prismaClient.user.count({
    where: {
      user_id: validatedUpdateRequest.user_id,
    },
  });
  if (countedUser !== 1) {
    throw new ResponseError(404, "user is not found");
  }

  const countTaken = await prismaClient.user.count({
    where: {
      OR: [{ username: validatedUpdateRequest.username }, { email: validatedUpdateRequest.email }],
      NOT: { user_id: validatedUpdateRequest.user_id },
    },
  });

  if (countTaken >= 1) {
    throw new ResponseError(409, "username or email not available");
  }

  const dataUpdate = {};
  if (validatedUpdateRequest.username) {
    dataUpdate.username = validatedUpdateRequest.username;
  }
  if (validatedUpdateRequest.email) {
    dataUpdate.email = validatedUpdateRequest.email;
  }
  if (validatedUpdateRequest.preferred_language) {
    dataUpdate.preferred_language = validatedUpdateRequest.preferred_language;
  }

  return await prismaClient.user.update({
    where: {
      user_id: validatedUpdateRequest.user_id,
    },
    data: dataUpdate,
    select: {
      username: true,
      email: true,
      preferred_language: true,
    },
  });
};

export default { register, login, get, update };
