#!bin/sh

fastapi dev backend/main.py & yarn --cwd frontend start
