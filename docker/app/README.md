Useful commands

1. It needs the `VITE_API_BASE_URL` variable

```bash
cp .env.sample .env
```

2. Build

```bash
COMPOSE_BAKE=true docker compose -f compose-prod.yml build --pull --no-cache
```

3. Up

```bash
COMPOSE_BAKE=true docker compose -f compose-prod.yml up -d
```
