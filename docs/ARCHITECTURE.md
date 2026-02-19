# Architecture (Phase 1)

Phase 1 establishes the skeleton only. This document is a placeholder for the modular monolith architecture; it will be expanded in later phases.

## High-Level Style

- **Modular monolith:** One deployable backend with clear package boundaries (`auth`, `room`, `chat`, `todo`, `event`, `realtime`, `common`, `persistence`). No microservices in Phase 1.
- **Frontend:** Single React app (Vite), talking to backend REST API; WebSocket and realtime features come in Phase 2+.

## Backend Module Layout (Skeleton)

```
com.chenxuan.realtimecollab/
├── common/          # Shared response wrapper, error handling, config
├── health/          # Health check API (/api/health)
├── auth/            # (Phase 2+) Authentication / authorization
├── room/            # (Phase 2+) Rooms
├── chat/            # (Phase 2+) Chat
├── todo/            # (Phase 3+) Shared todos
├── event/           # (Phase 2+) Domain events / messaging
├── realtime/        # (Phase 2+) WebSocket / realtime
└── persistence/     # JPA entities, repositories (shared data access)
```

## Infrastructure (Phase 1)

- **PostgreSQL:** Primary database (JPA/Hibernate).
- **Redis:** Caching / session / pub-sub (Phase 2+); connection configured in Phase 1.
- **Docker Compose:** Postgres and Redis for local development.

## Diagram (Placeholder)

A more detailed diagram (components, data flow, WebSocket and Redis usage) will be added in Phase 2 when auth, rooms and realtime are implemented.

## Docs

- [Development guide](DEVELOPMENT.md)
- [ADR: Tech stack](adr/0001-tech-stack.md)
