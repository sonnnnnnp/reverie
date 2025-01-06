.PHONY: help build up down shell-http shell-ws

#? help: ヘルプコマンド
help: Makefile
	@echo ""
	@echo "Usage:"
	@echo "  make [target]"
	@echo ""
	@echo "Targets:"
	@sed -n "s/^#?//p" $< | column -t -s ":"

#? build: アプリケーションのセットアップ
build:
	docker compose build --no-cache
	[ -f ./server/.env ] || cp ./server/.env.local ./server/.env
	npm ci && cd web && npm ci

#? up: アプリケーションの起動
up:
	docker compose up -d
	cd web && npm run dev

#? down: アプリケーションの停止
down:
	docker compose down

#? shell-http: HTTP サーバーのシェルを起動
shell-http:
	docker compose exec -it httpserver bash

#? shell-ws: WebSocket サーバーのシェルを起動
shell-ws:
	docker compose exec -it wsserver bash

.PHONY: api wire

#? api: OpenAPI からコードを生成
api:
	docker compose run --rm httpserver bash -c "oapi-codegen -package api /httpserver/api/openapi.json > /httpserver/server/adapter/http/api/interface.go"
	npx openapi-typescript ./api/openapi.json -o ./web/app/api/client.ts

#? wire: HTTP サーバーの依存関係を自動生成
wire:
	docker compose run --rm httpserver bash -c "cd /httpserver/server/cmd/httpserver/wire && wire gen && mv ./wire_gen.go /httpserver/server/cmd/httpserver/commands/wire.go"

.PHONY: migrate migrate-down seed sql-gen

#? migrate: データベースの構造をマイグレート
migrate:
	docker compose run --rm httpserver bash -c "cd server && migrate -source file://migrations -database postgres://user:password@postgres:5432/db?sslmode=disable up"

#? migrate-down: データベースの構造を初期化
migrate-down:
	docker compose run --rm httpserver bash -c "cd server && migrate -source file://migrations -database postgres://user:password@postgres:5432/db?sslmode=disable down"

#? seed: データベースへ初期データを投入
seed:
	docker compose run --rm httpserver bash -c "cd server && go run ./cmd/seed"

#? sql-gen: SQL クエリから Go コードを生成
sql-gen:
	docker compose run --rm httpserver bash -c "cd server && sqlc generate"
