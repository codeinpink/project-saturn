from django.core.management.base import BaseCommand
import csv
from features.models import Team

FILE_NAME = 'Teams_Import.csv'

class Command(BaseCommand):
    help = 'Imports teams into database from CSV file'

    def handle(self, *args, **options):
        with open(FILE_NAME, 'r') as teams:
            reader = csv.reader(teams, delimiter=';')

            for row in reader:
                try:
                    Team.objects.create(name=row[0])
                except Exception as e:
                    print('Error importing {} - {}'.format(row, e))
