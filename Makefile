# Phase 1: Run dependencies, backend, frontend. Requires: Docker, JDK 21, Maven, Node.js

.PHONY: deps backend frontend test test-backend test-frontend clean

deps:
	docker-compose up -d
	@echo "Wait for Postgres and Redis to be healthy: docker-compose ps"

backend:
	cd backend && mvn spring-boot:run -Dspring-boot.run.profiles=local

frontend:
	cd frontend && npm install && npm run dev

test: test-backend
	@echo "Backend tests passed. Frontend: cd frontend && npm run build"

test-backend:
	cd backend && mvn test

test-frontend:
	cd frontend && npm run build

clean:
	cd backend && mvn clean
	cd frontend && rm -rf node_modules dist
	docker-compose down
