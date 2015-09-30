# Project Saturn - PSI Planning Made Easy

Previously a team hackathon project for 9/10/2015 (see hackathon branch).  Now a fully functional PSI planning tool.


## Getting Started
### Install Dependencies
1. Install Python 2.7
2. Install Django
3. Install Django Rest Framework

### Download
1. Clone this repo: ```git clone https://github.com/codeinpink/project-saturn.git```
2. ```cd project-saturn```
 
### Set Up Project
1. Make migrations: ```python manage.py makemigrations```
2. Migrate: ```python manage.py migrate```
3. Import teams and features from CSV files: ```python manage.py import_teams``` and ```python manage.py import_features```
4. Run server: ```python manage.py runserver```
5. Navigate to 127.0.0.1:8000 and enjoy :bowtie:


## To-do
- [ ] Add loading bar to indicate site is loading
- [ ] Add loading bar to tables to indicate loading data
- [ ] Add front end tests
- [ ] Add back end tests
- [ ] Add 'unique' requirements when applicable to models
- [ ] Remove auto-refresh on Commitments page *or* find a way to keep filters/spot when refreshing data
- [ ] Add Features page (feature roll-up of commitments)
- [ ] Add Teams page (view all team plans)
- [ ] Double check theme field is a dropdown when adding new features (is this admin?)
- [ ] Add confirmation prompt for when user attempts to save 0 unplanned work
- [ ] Update home page to remove "View All Commitments" button, add navbar, and show input field by default
