import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

web.listen(3008, () => {
  logger.info("app start at localhost:3008");
});
