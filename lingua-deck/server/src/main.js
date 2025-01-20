import { web } from "./apps/web.js";
import { logger } from "./apps/logging.js";

web.listen(3008, () => {
  logger.info("app start at http://localhost:3008");
});
