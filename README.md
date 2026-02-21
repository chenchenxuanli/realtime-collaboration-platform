# Realtime Collaboration Platform

A realtime collaboration platform built with Spring Boot, WebSocket and Redis, supporting chat, presence and shared tasks.

## Overview

This repo is structured as a **modular monolith**: backend (Spring Boot 3, Java 21) and frontend (React + TypeScript, Vite). Phase 1 delivers project skeleton, infrastructure (Postgres + Redis via Docker), and a minimal runnable stack with a health check endpoint and a simple frontend that displays backend status.

## Tech Stack

| Layer    | Stack |
|----------|--------|
| Backend  | Java 21, Spring Boot 3.4.x, Maven, Spring Web, Validation, Actuator, Spring Data JPA (Hibernate), PostgreSQL, Spring Data Redis (Lettuce), springdoc-openapi (Swagger UI) |
| Frontend | React 18, TypeScript, Vite |
| DevOps   | Docker, docker-compose (Postgres 16, Redis 7) |

## Quick Start

**Prerequisites:** Docker (and Docker Compose), JDK 21, Node.js 18+, Maven 3.9+.

1. **Clone and prepare env**
   ```bash
   git clone <repo-url>
   cd realtime-collaboration-platform
   cp .env.example .env
   # Edit .env if needed (defaults work with docker-compose below)
   ```

2. **Start Postgres and Redis**
   ```bash
   docker-compose up -d
   ```
   Wait until both services are healthy (`docker-compose ps`).

3. **Run the backend**
   ```bash
   cd backend
   mvn spring-boot:run -Dspring-boot.run.profiles=local
   ```
   Backend runs at **http://localhost:8080** (see [URLs](#urls)). It reads DB/Redis from `.env` when using profile `local`.

4. **Run the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs at **http://localhost:5173**; it proxies `/api` to the backend.

## URLs

| Service   | URL |
|-----------|-----|
| Backend   | http://localhost:8080 |
| API base  | http://localhost:8080/api |
| Health    | http://localhost:8080/api/health |
| Register  | POST http://localhost:8080/api/auth/register |
| Swagger UI| http://localhost:8080/swagger-ui.html |
| Actuator  | http://localhost:8080/actuator |
| Frontend  | http://localhost:5173 (dev) |

## Docs

- [Development guide (run, build, test)](docs/DEVELOPMENT.md)
- [Architecture (modular monolith)](docs/ARCHITECTURE.md)
- [ADR: Tech stack](docs/adr/0001-tech-stack.md)

## Phase Plan

- **Phase 1:** Project init, skeleton, Docker (Postgres + Redis), health endpoint, minimal frontend, docs and ADR.
- **Phase 2 (in progress):** Auth (registration done; JWT login and rooms to follow), WebSocket/realtime layer, rooms and basic chat.
  - Step 2 done: **User registration** — `POST /api/auth/register` (BCrypt, duplicate email rejected).
- **Phase 3:** Todo/shared tasks, presence, polish and production-readiness.

## Verification

From repo root:

```bash
# 1. Start dependencies
docker-compose up -d
docker-compose ps   # ensure postgres + redis are up

# 2. Backend: tests (no Docker) + run (Docker required)
cd backend && mvn test
# Then run app (with Docker up): mvn spring-boot:run -Dspring-boot.run.profiles=local
# In another terminal: curl http://localhost:8080/api/health  -> {"status":"ok"}
# Register: curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"email":"u@example.com","password":"secret6","displayName":"User"}'

# 3. Frontend
cd frontend && npm install && npm run dev
# Open http://localhost:5173 and confirm "Backend status: ok"
```

## License

See [LICENSE](LICENSE).
