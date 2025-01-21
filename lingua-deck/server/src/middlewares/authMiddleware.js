import { prismaClient } from "../apps/database.js";

const authMiddleware = async (request, response, next) => {
  const token = request.get("Authorization");
  if (!token) {
    response
      .status(401)
      .json({
        error: {
          message: "unauthorized",
        },
      })
      .end();
  } else {
    const queriedUser = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
      select: {
        username: true,
      },
    });
    if (!queriedUser) {
      response
        .status(401)
        .json({
          error: {
            message: "unauthorized",
          },
        })
        .end();
    } else {
      request.user = queriedUser;
      next();
    }
  }
};

export { authMiddleware };
