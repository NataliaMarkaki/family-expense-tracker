## Description

## Pre-reqs for local development

```bash
$ docker compose up
cd apps/api
pnpm prisma migrate deploy
pnpm prisma generate
pnpm prisma db seed
pnpm prisma studio
```
