# How to install the project

1. Create the network

```bash
docker network create caddie_network
```

2. Pull docker dependencies

```bash
docker compose pull
```

3. Install npm dependencies
   
```bash
docker compose run --rm frontend npm ci
```

4. Start the app

```bash
docker compose up
```

5. Check the node version

``` bash
docker compose exec frontend node -v
```

6. Install npm package

```bash
docker compose run --rm frontend npm install <package>
```