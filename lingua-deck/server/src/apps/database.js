import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "query",
    },
  ],
});

prismaClient.$on("error", (errorEvent) => {
  logger.error(errorEvent);
});

prismaClient.$on("warn", (warnEvent) => {
  logger.warn(warnEvent);
});

prismaClient.$on("info", (infoEvent) => {
  logger.info(infoEvent);
});

prismaClient.$on("query", (queryEvent) => {
  logger.info(queryEvent);
});
