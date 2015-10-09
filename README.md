# Instructions

## Set Up

In your home directory, make a folder `planning_tool_docker` and `cd` into it. Git clone this branch into a folder
named `planning_tool`, `cd` into it, and then clone the django project branch. Make a `db` folder next
to the `project-saturn` folder; this will hold the database file. Example directory structure:

```
home/developer
|-- planning_tool_docker
    |-- planning_tool
      |-- README.md
      |-- start.sh
      |-- stop.sh
      |-- buid.sh
      |-- Dockerfile
      |-- docker-entrypoint.sh
      |-- planning.conf
      |-- project-saturn
          |-- # DJANGO PROJECT FILES HERE
      |-- db
          |-- # DB FILE HERE
```

## Make the Scripts Executable

`chmod +x start.sh`

`chmod +x stop.sh`

`chmod +x build.sh`

`chmod +x docker-entrypoint.sh`

## Use the Scripts

1.  Build the docker image: `./build.sh`
2.  Create and start the docker container using the image we just created: `./start.sh`
3.  Stop and remove the docker container: `./stop.sh`

Any time you make a change, you will need to stop, build, and start (in that order).

If you are making any changes to the database models, you will need to run `python manage.py makemigrations`
before you build and start.

## Details

### Port
The script uses the default port (80), so if you go to your IP in the browser, you should be able to see the project
without specifying the port number. If you do need to specify a port number, change the value in `start.sh`:

`-p 80:8000` => `-p PORTNUM:8000`

### Database
The database is mounted, so stopping and building the container will not destroy the data. The database file is in the `db`
folder.
