# Project Saturn - PSI Planning Made Easy

Previously a team hackathon project for 9/10/2015 (see hackathon branch).  Now a fully functional PSI planning tool.

## Getting Started
### Install Dependencies
1. Install Python 2.7
2. Install Django
3. Install Django Rest Framework

### Download
1. Clone this repo: ```git clone git@github.com:codeinpink/project-saturn.git```
2. ```cd project-saturn```
 
### Set Up Project
1. Make migrations: ```python manage.py makemigrations```
2. Migrate: ```python manage.py migrate```
3. Import teams and features from CSV files: ```python manage.py import_teams``` and ```python manage.py import_features```
4. Run server: ```python manage.py runserver```
5. Navigate to 127.0.0.1:8000 and enjoy :bowtie:
