include .env

build:
	forge build --names --force

install:
	poetry install

deploy: build install
	poetry run python scripts/deploy.py
