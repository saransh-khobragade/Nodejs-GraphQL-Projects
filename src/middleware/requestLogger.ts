import pinoHttp from "pino-http";
import { logger } from "../lib/logger";

export const requestLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) => {
      const path = req.url ?? "";
      return path === "/health" || path === "/metrics";
    },
  },
});
