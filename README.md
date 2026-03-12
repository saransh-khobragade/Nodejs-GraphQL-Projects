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
