.DEFAULT_GOAL := test
## GENERAL ##

install:
	npm install

install-production:
	npm install --production

build:
	npm run build --if-present

run:
	firebase emulators:exec "npm run start:dev" --only firestore

lint:
	npm run lint

lint-fix:
	npm run lint-fix

format:
	npm run format

format-fix:
	npm run format-fix

test-unit:
	npm run test

test-unit-cov:
	npm run test:cov

test-e2e:
	firebase emulators:exec "npm run test:e2e" --only firestore

.PHONY: test
test:
	@make fix
	@make format
	@make lint
	@#make test-unit-cov
	@make test-e2e

fix:
	@make format-fix
	@make lint-fix

help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.## .$$' $(MAKEFILE_LIST) | sed -e 's/:.##\s/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'