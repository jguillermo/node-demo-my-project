.DEFAULT_GOAL := test
## GENERAL ##

export BACKEND_RUN=docker compose run backend

install:
	@${BACKEND_RUN} npm install

build:
	docker build -t my-proyect-app:prod-1 --target production .

lint:
	@${BACKEND_RUN} npm run lint

lint-check:
	@${BACKEND_RUN} npx eslint "{src,apps,libs,test}/**/*.ts"

format:
	@${BACKEND_RUN} npm run format

format-check:
	@${BACKEND_RUN} npx prettier --check "src/**/*.ts" "test/**/*.ts"

test-unit:
	@${BACKEND_RUN} npm run test

test-integration:
	@${BACKEND_RUN} firebase emulators:exec "npm run test:e2e" --only firestore

test-bdd:
	@${BACKEND_RUN} firebase emulators:exec "npm run bdd" --only firestore

sh:
	@${BACKEND_RUN} sh

exec:
	docker compose exec backend sh

.PHONY: test
test:
	@make format
	@make lint
	@make format-check
	@make lint-check
	@make test-unit
	@make test-integration
	@make test-bdd

up:
	@docker compose up -d
	@make log

down:
	@docker compose down

ps:
	@docker compose ps

log:
	@docker compose logs -f backend

docker-kill:
	@make down
	@docker rm -f $$(docker ps -a -q) || true
	@docker volume prune -f
	@docker network prune -f

help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'