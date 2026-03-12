# Node.js Express TypeScript GraphQL Demo

## Start

```bash
yarn install
yarn dev
```

Server runs at `http://localhost:4000/graphql`.

## Basic Query

Open `http://localhost:4000/graphql` in a browser (Apollo Sandbox) and run:

```graphql
{
  books {
    id
    title
    author
    year
  }
}
```

## Logs and Monitoring

- **`GET /health`** – Health check, returns `{"status":"ok"}`
- **`GET /metrics`** – Prometheus metrics (request count, latency, Node.js runtime)
- **Logs** – Structured JSON (Pino), pretty-printed in dev

## Dashboard

Run Prometheus + Grafana with Docker:

```bash
docker compose up -d
```

1. Start the app: `yarn dev`
2. Start the stack: `docker compose up -d`
3. Open **Grafana**: http://localhost:3000 (login: `admin` / `admin`)
4. Go to **Dashboards** → **GraphQL Demo**

Prometheus: http://localhost:9090
