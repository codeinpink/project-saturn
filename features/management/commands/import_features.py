from django.core.management.base import BaseCommand
import csv
from features.models import Feature, Team

FILE_NAME = 'Features_Import.csv'

ID = 0
FEATURE = 1
TEAMS = 2
THEME = 3

class Command(BaseCommand):
    help = 'Imports features into database from CSV file'

    def handle(self, *args, **options):
        with open(FILE_NAME, 'r') as features:
            features.next() # skip header
            reader = csv.reader(features, delimiter=',')

            for row in reader:
                try:
                    teams = self.get_team_objects(filter(None, row[TEAMS].split(';')))

                    feature = Feature(name=row[FEATURE], theme=row[THEME],
                                                    clarity_or_jira_id=row[ID])
                    feature.save()
                    feature.teams.add(*teams)
                    feature.save()
                except Exception as e:
                    print('Error importing {} - {}'.format(row, e))

    def get_team_objects(self, team_list):
        teams = []

        for team_str in team_list:
            team_str = team_str.strip()

            try:
                team = Team.objects.get(name=team_str)
                teams.append(team)
            except:
                print('Could not find team: {}'.format(team_str))

        return teams
