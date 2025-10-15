"""Gunicorn development config file"""
import os

wsgi_app = "main:app"
loglevel = "info"
workers = int(os.environ.get('WORKERS', 3))
worker_class = 'uvicorn.workers.UvicornWorker'
bind = "0.0.0.0:8000"
reload = False
accesslog = "-"
errorlog = "-"
