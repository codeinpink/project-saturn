from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.urlresolvers import reverse
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from .models import Team, Feature, Commitment, Risk, Dependency
from .serializers import TeamSerializer, FeatureSerializer, CommitmentSerializer, \
                        RiskSerializer, DependencySerializer

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

class TeamRestTestCase(APITestCase):
    def setUp(self):
        Team.objects.create(name='3rd Rail')

    def test_query(self):
        '''Teams can be queried and result contains necessary data'''

        team = Team.objects.get()

        response = self.client.get(reverse('team-detail', args=[team.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, TeamSerializer(team).data)

        response = self.client.get(reverse('team-list'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [TeamSerializer(team).data])

        team2 = Team.objects.create(name='4th Rail')

        response = self.client.get(reverse('team-list'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [TeamSerializer(team).data, TeamSerializer(team2).data])

    def test_update(self):
        '''Team data can be updated'''

        team = TeamSerializer(Team.objects.get()).data
        team['confidence'] = 3.4
        team['planned_unplanned_work'] = 10.2
        team['previous_unplanned_work'] = 33.3

        response = self.client.put(reverse('team-detail', args=[team['id']]), team, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, TeamSerializer(team).data)

        team = Team.objects.get()
        self.assertEqual(team.confidence, 3.4)
        self.assertEqual(team.planned_unplanned_work, 10.2)
        self.assertEqual(team.previous_unplanned_work, 33.3)
