# How to install the project

1. Create a local .env file

```bash
cp .env.sample .env
```

2. Create the network

```bash
docker network create caddie_network
```

3. Pull docker dependencies

```bash
docker compose pull
```

4. Install npm dependencies
   
```bash
docker compose run --rm frontend npm ci
```

5. Start the app

```bash
docker compose up
```

6. Check the node version

``` bash
docker compose exec frontend node -v
```

7. Install new npm packages

```bash
docker compose run --rm frontend npm install <package>
```