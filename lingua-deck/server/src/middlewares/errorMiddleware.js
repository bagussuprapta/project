import { ResponseError } from "../errors/responseError.js";

const errorMiddleware = async (error, request, response, next) => {
  if (!error) {
    next();
    return;
  }
  if (error instanceof ResponseError) {
    response
      .status(error.status)
      .json({
        error: {
          message: error.message,
        },
      })
      .end();
  } else {
    response
      .status(500)
      .json({
        error: {
          message: error.message,
        },
      })
      .end();
  }
};

export { errorMiddleware };
