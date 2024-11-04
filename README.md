# Запуск

## Nix

-   `nix develop --impure -c fish`
-   `devenv up`
-   Собрать докер(не работает):
    `nix run --impure .#container-obp-api.copyToDockerDaemon`

## Docker

-   Создать `.env` файлы в `./backend` и `./frontend` (см. `.env.example`)
-   `docker compose build`
-   `docker compose up`
-   frontend доступен по адресу `http://localhost:5173`, backend - `http://localhost:8000`

# TODO

-   Добавить описание к проекту
