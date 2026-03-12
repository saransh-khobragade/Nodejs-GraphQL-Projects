# Node.js Express TypeScript GraphQL Demo

A minimal GraphQL API demo with Express, Apollo Server, TypeScript, structured logging (Pino), and Prometheus metrics.

**Tech stack:** Node.js, Express, TypeScript, Apollo Server 4, GraphQL, Pino, Prometheus

## Start

```bash
yarn install
yarn dev
```

Server runs at `http://localhost:4000/graphql`.

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server with hot reload |
| `yarn build` | Compile TypeScript to `dist/` |
| `yarn start` | Run compiled app |

## GraphQL API

**Queries:**
- `books` – List all books
- `book(id)` – Get book by ID

**Mutations:**
- `addBook(title, author, year)` – Add a book
- `deleteBook(id)` – Delete a book

**Example query:**
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

**Example mutation:**
```graphql
mutation {
  addBook(title: "Clean Code", author: "Robert Martin", year: 2008) {
    id
    title
    author
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

| Service | URL |
|---------|-----|
| Grafana | http://localhost:3000 |
| Prometheus | http://localhost:9090 |
