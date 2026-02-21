# Development Guide

How to run, build and test the project locally. Auth registration is implemented; login and rooms are in progress.

## Prerequisites

- **Docker** and **Docker Compose** (for Postgres and Redis)
- **JDK 21**
- **Maven** 3.9+
- **Node.js** 18+ and **npm** (for frontend)

## Environment

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Adjust `.env` if needed. Defaults work with `docker-compose up -d` (Postgres on 5432, Redis on 6379).

Backend `application-local.yml` reads: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `REDIS_HOST`, `REDIS_PORT`. Use `spring.profiles.active=local` when running locally (or set in IDE).

## Running the Stack

### 1. Start dependencies

```bash
docker-compose up -d
docker-compose ps   # ensure both services are healthy
```

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

- Default profile can run without `local` if you rely on defaults in `application.yml`.
- With local profile (recommended): `mvn spring-boot:run -Dspring-boot.run.profiles=local`
- Backend: http://localhost:8080  
- Health: http://localhost:8080/api/health  
- Register: `POST /api/auth/register` (body: `{"email":"...","password":"...","displayName":"..."}`; password min 6 chars)  
- Swagger UI: http://localhost:8080/swagger-ui.html  
- Actuator: http://localhost:8080/actuator/health  

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173  
- Vite proxies `/api` to `http://localhost:8080`, so the health check page can call `/api/health` without CORS.

## Build & Test

### Backend

```bash
cd backend
mvn clean test          # run tests
mvn clean package       # build JAR (skip tests: -DskipTests)
java -jar target/*.jar  # run JAR (use profile: --spring.profiles.active=local)
```

### Frontend

```bash
cd frontend
npm run build   # production build
npm run preview # serve production build locally
```

## Project Layout

- **backend/** – Spring Boot app; packages: `common`, `health`, `auth` (registration implemented), `room`, `chat`, `todo`, `event`, `realtime`, `persistence`.
- **frontend/** – React + TypeScript + Vite; single page calling `/api/health`.
- **docs/** – Development guide, architecture, ADRs.

## API Examples

**Register a user**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret6","displayName":"Alice"}'
```
Success: `201` with `{"success":true,"data":{"id":"...","email":"user@example.com","displayName":"Alice","createdAt":"..."}}`.  
Duplicate email or validation error: `400` with `{"success":false,"error":"...","message":"..."}`.

## Overall Plan

- **Phase 1:** Skeleton, Docker, health endpoint, minimal frontend, docs.
- **Phase 2:** Auth registration (done), JWT login, WebSocket/realtime, rooms and chat.
- **Phase 3:** Todo/shared tasks, presence, production hardening.

For architecture and tech choices, see [ARCHITECTURE.md](ARCHITECTURE.md) and [adr/0001-tech-stack.md](adr/0001-tech-stack.md).
