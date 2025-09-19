#!/bin/bash -e

python -V

celery -A src.redis.celery worker --loglevel=info

gunicorn -c gunicorn_conf.py