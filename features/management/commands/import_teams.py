from django.core.management.base import BaseCommand
import csv
from features.models import Team

FILE_NAME = 'PSI_19__Teams.txt'

class Command(BaseCommand):
    help = 'Imports teams into database from CSV file'

    def handle(self, *args, **options):
        with open(FILE_NAME, 'r') as teams:
            reader = csv.reader(teams, delimiter=',')

            for row in reader:
                try:
                    team = row[0].strip()

                    if Team.objects.filter(name=team).count() == 0:
                        Team.objects.create(name=team)
                except Exception as e:
                    print('Error importing {} - {}'.format(row, e))
