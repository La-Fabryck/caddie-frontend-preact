.PHONY: update install dedupe lint help

update:
	docker compose run --rm frontend npx npm-check-updates -u -i --format group

# Install dependencies
install:
	docker compose run --rm frontend npm ci

dedupe:
	docker compose run --rm frontend npm dedupe

lint:
	docker compose run --rm frontend npm run lint-fix

# Help target
help:
	@echo "Available targets:"
	@echo "  update   - Update all dependencies except fastify"
	@echo "  deps     - Alias for update"
	@echo "  check    - Check for available updates (dry run)"
	@echo "  versions - Show current Fastify package versions"
	@echo "  install  - Install dependencies"
	@echo "  lint     - Invoke lint-fix command"