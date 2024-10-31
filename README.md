# Запуск

## Backend

-   `cd backend`
-   `pip install -r requirements.txt`
-   `fastapi dev`

## Frontend

-   `cd frontend`
-   Создать `.env` файл (см. `env.example`)
-   `yarn install`
-   `yarn start`

## Nix

-   `nix develop --impure -c fish`
-   `devenv up`
-   Собрать докер(не работает):
      `nix run --impure .#container-obp-api.copyToDockerDaemon`)

# TODO

-   написать нормальный readme
-   запуск через докер
