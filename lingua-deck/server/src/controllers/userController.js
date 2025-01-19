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

export default { register };
