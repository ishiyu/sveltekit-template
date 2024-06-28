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
- [x] deployment for Vercel
  - [x] setup [Vercel SpeedInsight](https://github.com/vercel/speed-insights)
  - [x] CD is auto setup when first deployed (when pushed main branch)

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
pnpm run build
```

## Deploying Vercel

First deploy is reference this site.
https://qiita.com/Notta_Engineering/items/1db3a14be8caa9a63ab2

And after pushing to the main branch, it is automatically deployed to Vercel.
