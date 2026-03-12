import type { Request, Response, NextFunction } from "express";
import { recordRequest } from "../lib/metrics";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    const method = req.method;
    const path = req.originalUrl?.split("?")[0] ?? req.path ?? "/";
    const statusCode = res.statusCode;

    recordRequest(method, path, statusCode, durationMs);
  });

  next();
}
