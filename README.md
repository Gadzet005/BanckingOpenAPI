# Запуск

## Nix

-   `nix develop --impure -c fish`
-   `devenv up`
-   Собрать докер(не работает):
    `nix run --impure .#container-obp-api.copyToDockerDaemon`

## Backend

-   `cd backend`
-   `pip install -r requirements.txt`
-   `cd src`
-   `python manage.py migrate`
-   `python manage.py runserver`

## Frontend

-   `cd frontend`
-   Создать `.env` файл (см. `env.example`)
-   `yarn install`
-   `yarn dev`

# TODO

-   написать нормальный readme
-   запуск через докер
