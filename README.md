# sveltekit-template

sveltekit を始めるときのテンプレートとして利用したい。

## setup libraries

- [x] [docker](https://www.docker.com/)
- [x] pnpm with corepack
- [x] Lefthook (nearly husky)
- [x] svelte & sveltekit
- [x] [prisma](https://github.com/prisma) with postgresql
- [ ] request API with [ky](https://github.com/sindresorhus/ky)
- [ ] validate with [valibot](https://valibot.dev/)
- [x] [biome](https://biomejs.dev/)
- [x] [vite](https://ja.vitejs.dev/)
- [ ] unit test with [vitest](https://vitest.dev/)
- [x] github actions for CI
- [ ] deployment for Vercel
  - [ ] github actions for CD

## Library update

```bash
docker-compose build
docker-compose up -d

```

## DB Migrate

```bash
# in docker
docker-compose exec web bash
pnpm prisma migrate dev

# in host
cp -p .env.dev .env # only once
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

## Deploying Vercel

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
docker-compose build
docker-compose up -d

```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
