import {
  Registry,
  Counter,
  Histogram,
  collectDefaultMetrics,
} from "prom-client";

const register = new Registry();
collectDefaultMetrics({ register });

const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "path", "status"],
  registers: [register],
});

const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "path"],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register],
});

export function recordRequest(
  method: string,
  path: string,
  statusCode: number,
  durationMs: number
): void {
  const status = String(statusCode);
  httpRequestsTotal.inc({ method, path, status });
  httpRequestDuration.observe(
    { method, path },
    durationMs / 1000
  );
}

export async function getMetrics(): Promise<string> {
  return register.metrics();
}
