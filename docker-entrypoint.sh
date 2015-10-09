#!/bin/bash

mkdir /srv/project-saturn/logs
service nginx start
python manage.py migrate
python manage.py collectstatic --noinput


touch /srv/logs/gunicorn.log
touch /srv/logs/access.log
tail -n 0 -f /srv/logs/*.log &
echo Starting Gunicorn.
exec gunicorn saturn.wsgi:application \
    --name project_saturn \
    --bind 127.0.0.1:8001 \
    --workers 9 \
    --log-level=info \
    --log-file=/srv/logs/gunicorn.log \
    --access-logfile=/srv/logs/access.log \
    "$@"

