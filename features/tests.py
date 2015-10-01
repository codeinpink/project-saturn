from django.test import TestCase
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from .models import Team

class TeamTestCase(TestCase):
    def setUp(self):
        Team.objects.create(name='3rd Rail')

    def test_team_uniqueness(self):
        '''Names and slugs are unique'''

        with self.assertRaises(IntegrityError):
            Team.objects.create(name='3rd Rail')

    def test_team_slug(self):
        '''Slugs are correctly set'''

        team = Team.objects.get(name='3rd Rail')
        self.assertEqual(team.slug, '3rd-rail')

        team.name = '4th Rail'
        team.save()
        self.assertEqual(team.slug, '4th-rail')
