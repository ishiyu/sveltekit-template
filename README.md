# sveltekit-template

sveltekit を始めるときのテンプレートとして利用したい。

## setup libraries

- pnpm with corepack
- Lefthook (nearly husky)
- svelte & sveltekit
- prisma with postgresql
- biome
- vite
- vitest
- docker

and github actions for CI.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
docker-compose build
docker-compose up -d

```

## Library update

```bash
docker-compose build
docker-compose up -d

```

## DB Migrate

```bash
docker-compose exec web bash

pnpm prisma migrate dev
```

## Connect DB with psql

```bash
docker-compose exec db bash

psql -d mydb -U postgres

```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
