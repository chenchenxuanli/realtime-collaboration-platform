# Architecture

Modular monolith backend with clear package boundaries. Auth module implements registration; login and rooms to follow.

## High-Level Style

- **Modular monolith:** One deployable backend with packages: `auth`, `room`, `chat`, `todo`, `event`, `realtime`, `common`, `persistence`.
- **Frontend:** Single React app (Vite), talking to backend REST API; WebSocket and realtime in later phases.

## Backend Module Layout

```
com.chenxuan.realtimecollab/
├── common/          # Shared response wrapper, global exception handling, config
├── health/          # Health check API (/api/health)
├── auth/            # Registration (done), login and JWT (Phase 2)
│   ├── config/      # SecurityConfig (PasswordEncoder; permitAll for now)
│   ├── dto/         # RegisterRequest, UserResponse
│   └── service/     # AuthService
├── room/            # (Phase 2) Rooms
├── chat/            # (Phase 2) Chat
├── todo/            # (Phase 3) Shared todos
├── event/           # (Phase 2) Domain events / messaging
├── realtime/        # (Phase 2) WebSocket / realtime
└── persistence/     # JPA entities (User), repositories (UserRepository)
```

## Infrastructure

- **PostgreSQL:** Primary database (JPA/Hibernate).
- **Redis:** Caching / session / pub-sub (Phase 2+); connection configured in Phase 1.
- **Docker Compose:** Postgres and Redis for local development.

## Diagram

A detailed diagram (data flow, WebSocket, Redis) will be added when rooms and realtime are implemented.

## Docs

- [Development guide](DEVELOPMENT.md)
- [ADR: Tech stack](adr/0001-tech-stack.md)
