import { ResponseError } from "../errors/responseError.js";
import userService from "../services/userService.js";

const register = async (request, response, next) => {
  try {
    if (JSON.stringify(request.body) === "{}") {
      throw new ResponseError(400, "data is required");
    }
    const result = await userService.register(request.body);
    response.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (request, response, next) => {
  try {
    const result = await userService.login(request.body);
    response.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const result = await userService.get(request.user);
    response.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    request.body.user_id = request.user.user_id;
    const result = await userService.update(request.body);
    response.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { register, login, get, update };
