import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schema";
import { logger } from "./lib/logger";
import { getMetrics } from "./lib/metrics";
import { requestLogger } from "./middleware/requestLogger";
import { metricsMiddleware } from "./middleware/metricsMiddleware";

const PORT = process.env.PORT || 4000;

async function main() {
  const app = express();

  app.use(requestLogger);
  app.use(metricsMiddleware);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(await getMetrics());
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  app.listen(PORT, () => {
    logger.info({ port: PORT }, `Server running at http://localhost:${PORT}/graphql`);
  });
}

main().catch((err) => logger.error(err, "Failed to start server"));
