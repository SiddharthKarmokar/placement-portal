#!/bin/bash -e

python -V

python -m src.worker &

<<<<<<< HEAD
<<<<<<< HEAD
gunicorn -c gunicorn_conf.py 

=======
gunicorn -c gunicorn_conf.py
>>>>>>> b7e23e29984c3963c764f9686631077c83ab9b37
=======
gunicorn -c gunicorn_conf.py
>>>>>>> b7e23e29984c3963c764f9686631077c83ab9b37
