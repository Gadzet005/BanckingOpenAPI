<div align="center">
    <h1>Финансовый помощник</h1>
    <h3>Получайте информацию о транзакциях по своим счетам в режиме реального времени.</h3>
</div>

# Запуск в режиме разработчика

## Docker
-   Создать `.env` файлы в `./backend`, `./frontend`, `./bank_simulation` (см. `.env.example`)
-   `docker compose build`
-   `docker compose up`
-   frontend доступен по адресу `http://localhost:5173`, backend - `http://localhost:8000`, банковская песочница - `http://localhost:5000`

## Nix (пока не работает)
-   `nix develop --impure -c fish`
-   `devenv up`
-   Собрать докер(не работает):
    `nix run --impure .#container-obp-api.copyToDockerDaemon`

# Тестирование
- Для тестирования можно зарегистрироваться под номером `+71234567890`, тогда вам будет доступен тестовый набор транзакций.
