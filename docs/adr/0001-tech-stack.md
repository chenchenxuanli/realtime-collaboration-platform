# ADR 0001: Tech stack (Spring Boot 3, JPA, Postgres, Redis, React)

## Status

Accepted (Phase 1).

## Context

We need a stack that supports a realtime collaboration platform: REST API, optional WebSocket, persistence, caching/session/pub-sub, and a modern frontend. The project should be runnable locally with minimal setup (Docker for dependencies) and align with common UK-style backend practices (Spring Boot, clear structure, docs, ADRs).

## Decision

- **Backend:** Java 21, Spring Boot 3.4.x, Maven. Spring Web, Validation, Actuator; Spring Data JPA (Hibernate) with PostgreSQL; Spring Data Redis (Lettuce). API docs via springdoc-openapi (Swagger UI).
- **Frontend:** React 18 with TypeScript, Vite. No UI library in Phase 1.
- **Data:** PostgreSQL as primary store; Redis for caching/session/pub-sub (used from Phase 2).
- **DevOps:** Docker and docker-compose for Postgres and Redis; env-based config (e.g. `.env.example`).

## Rationale

- **Spring Boot 3 + Java 21:** Mature ecosystem, strong typing, good fit for modular monolith and future WebSocket/STOMP. LTS alignment.
- **JPA + PostgreSQL:** Standard relational model, good tooling and operational familiarity in UK backend teams.
- **Redis:** Needed for realtime (presence, pub-sub) and optional caching/session; Lettuce is the recommended client.
- **React + TypeScript + Vite:** Fast dev experience, type safety, and common choice for SPAs; Vite keeps Phase 1 setup simple.
- **Modular monolith:** Single deployable with clear packages keeps Phase 1 simple while preserving a path to extract services later if needed.

## Consequences

- Team needs JDK 21, Maven, Node.js, and Docker.
- Spring Boot 3 requires Java 17+; we standardise on 21.
- Phase 1 does not include Security/JWT, WebSocket, or Testcontainers; these are planned for Phase 2+.

## References

- [Development guide](../DEVELOPMENT.md)
- [Architecture](../ARCHITECTURE.md)
