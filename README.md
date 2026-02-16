# Test Case Service

Базовый монорепозиторий для сервиса создания и описания e2e тест-кейсов.

## Структура

- `frontend` — React + TypeScript + styled-components + axios + ESLint.
- `backend` — Express + TypeScript + MongoDB.

## Быстрый старт

```bash
npm run install:all
```

### Frontend

```bash
npm run dev --workspace frontend
```

### Backend

```bash
npm run dev --workspace backend
```

## Переменные окружения backend

Создайте `.env` в папке `backend`:

```env
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/test-case-service
MONGO_DB_NAME=test-case-service
```

## Что уже есть

### Frontend

- Роутинг:
  - `/` — главная страница с подсказкой по входу и вводом имени после авторизации.
  - `/login` — форма авторизации с полями: Имя, Логин, Почта, Пароль.
  - `/register` — форма регистрации с полями: Имя, Логин, Почта, Пароль.
- Общий `MainLayout` с навигацией в шапке на авторизацию и регистрацию.
- Базовый `axios` клиент (`src/api/httpClient.ts`).

### Backend

- Базовый Express сервер.
- Подключение MongoDB (`MONGO_URI`, `MONGO_DB_NAME`) и коллекция `users`.
- Роуты:
  - `GET /api/health`.
  - `POST /api/auth/login`.
  - `POST /api/auth/register`.
