# Test Case Service

Базовый монорепозиторий для сервиса создания и описания e2e тест-кейсов.

## Структура

- `frontend` — React + TypeScript + styled-components + axios + ESLint.
- `backend` — Express + TypeScript.

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

## Что уже есть

### Frontend

- Роутинг:
  - `/` — пустая главная страница.
  - `/login` — пустая страница авторизации.
  - `/register` — пустая страница регистрации.
- Общий `MainLayout` с навигацией.
- Базовый `axios` клиент (`src/api/httpClient.ts`).

### Backend

- Базовый Express сервер.
- Роуты:
  - `GET /api/health`.
  - `POST /api/auth/login` (заглушка).
  - `POST /api/auth/register` (заглушка).
- Конфигурация через `.env` (`PORT`, `NODE_ENV`).
