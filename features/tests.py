from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.urlresolvers import reverse
from django.db import IntegrityError
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
        '''Teams can be queried'''

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

class FeatureTestCase():
    pass

class FeatureRestTestCase(APITestCase):
    def test_create(self):
        '''Features can be created'''

        feature = {'name': 'Test', 'theme': 'ABC', 'description': '',
                    'url': '', 'clarity_or_jira_id': ''}

        response = self.client.post(reverse('feature-list'), feature, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, FeatureSerializer(Feature.objects.get()).data)

    def test_query(self):
        '''Features can be queried'''

        feature = Feature.objects.create(name='Test', theme='ABC')

        response = self.client.get(reverse('feature-list'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [FeatureSerializer(feature).data])

        response = self.client.get(reverse('feature-detail', args=[feature.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, FeatureSerializer(feature).data)

class CommitmentTestCase():
    pass

class CommitmentRestTestCase(APITestCase):
    def setUp(self):
        Team.objects.create(name='3rd Rail')
        Feature.objects.create(name='Test', theme='ABC')

    def test_create(self):
        '''Commitments can be created'''

        team = Team.objects.get()
        feature = Feature.objects.get()
        commitment = {'name': 'C1', 'team_id': team.id, 'feature_id': feature.id,
                    'done_definition': 'PASSING DATA', 'status': 'COMMIT', 'start': '19-1', 'stop': '19-2',
                    'notes': 'a'}

        response = self.client.post(reverse('commitment-list'), commitment, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, CommitmentSerializer(Commitment.objects.get()).data)
        self.assertTrue(team in feature.teams.all())

        commitment['name'] = 'C2'

        response = self.client.post(reverse('commitment-list'), commitment, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, CommitmentSerializer(Commitment.objects.get(name=commitment['name'])).data)
        self.assertEqual(len(Feature.objects.get().teams.all()), 1) # team wasn't added to the feature's teams twice

    def test_query(self):
        '''Commitments can be queried'''

        commitment = Commitment.objects.create(name='C1', team_id=Team.objects.get().id, feature_id=Feature.objects.get().id,
                    done_definition='PASSING DATA', status='COMMIT', start='19-1', stop='19-2', notes='')

        response = self.client.get(reverse('commitment-list'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [CommitmentSerializer(commitment).data])

        response = self.client.get(reverse('commitment-detail', args=[commitment.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, CommitmentSerializer(commitment).data)

    def test_update(self):
        '''Commitments can be updated'''

        commitment = CommitmentSerializer(Commitment.objects.create(name='C1', team_id=Team.objects.get().id, feature_id=Feature.objects.get().id,
                    done_definition='PASSING DATA', status='COMMIT', start='19-1', stop='19-2', notes='')).data
        commitment.name = '1C'
        commitment.notes = 'blah'

        response = self.client.put(reverse('commitment-detail', args=[commitment['id']]), commitment, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, CommitmentSerializer(Commitment.objects.get()).data)

    def test_delete(self):
        '''Commitments can be deleted'''

        commitment = CommitmentSerializer(Commitment.objects.create(name='C1', team_id=Team.objects.get().id, feature_id=Feature.objects.get().id,
                    done_definition='PASSING DATA', status='COMMIT', start='19-1', stop='19-2', notes='')).data

        response = self.client.delete(reverse('commitment-detail', args=[commitment['id']]), commitment, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Commitment.objects.all().count(), 0)

class RiskTestCase():
    pass

class RiskRestTestCase(APITestCase):
    def setUp(self):
        Team.objects.create(name='3rd Rail')
        Feature.objects.create(name='Test', theme='ABC')
        Commitment.objects.create(name='C1', team_id=Team.objects.get().id, feature_id=Feature.objects.get().id,
                    done_definition='PASSING DATA', status='COMMIT', start='19-1', stop='19-2', notes='')

    def test_create(self):
        '''Risks can be created'''

        risk = {'name': 'R1', 'commitment_id': Commitment.objects.get().id, 'probability': 'HIGH',
                'impact': 'HIGH', 'severity': 'HIGH', 'resolution': 'AVOID', 'notes': ''}

        response = self.client.post(reverse('risk-list'), risk, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, RiskSerializer(Risk.objects.get()).data)
        self.assertTrue(Risk.objects.get() in Commitment.objects.get().risk_set.all())

    def test_query(self):
        '''Risks can be queried'''

        risk = Risk.objects.create(name='R1', commitment_id=Commitment.objects.get().id, probability='HIGH',
                impact='HIGH', severity='HIGH', resolution='AVOID', notes='')

        response = self.client.get(reverse('risk-list'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [RiskSerializer(risk).data])

        response = self.client.get(reverse('risk-detail', args=[risk.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, RiskSerializer(risk).data)

    def test_update(self):
        '''Risks can be updated'''

        risk = RiskSerializer(Risk.objects.create(name='R1', commitment_id=Commitment.objects.get().id,
                probability='HIGH', impact='HIGH', severity='HIGH', resolution='AVOID', notes='')).data
        risk.name = '1R'
        risk.notes = 'blah'

        response = self.client.put(reverse('risk-detail', args=[risk['id']]), risk, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, RiskSerializer(Risk.objects.get()).data)

    def test_delete(self):
        '''Risks can be deleted'''

        risk = RiskSerializer(Risk.objects.create(name='R1', commitment_id=Commitment.objects.get().id,
                probability='HIGH', impact='HIGH', severity='HIGH', resolution='AVOID', notes='')).data

        response = self.client.delete(reverse('risk-detail', args=[risk['id']]), risk, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Risk.objects.all().count(), 0)

class DependencyTestCase():
    pass

class DependencyRestTestCase(APITestCase):
    def setUp(self):
        Team.objects.create(name='3rd Rail')
        Team.objects.create(name='4th Rail')
        Feature.objects.create(name='Test', theme='ABC')
        Commitment.objects.create(name='C1', team_id=Team.objects.get(name='3rd Rail').id, feature_id=Feature.objects.get().id,
                    done_definition='PASSING DATA', status='COMMIT', start='19-1', stop='19-2', notes='')

    def test_create(self):
        '''Dependencies can be created'''

        dependency = {'name': 'D1', 'commitment_id': Commitment.objects.get().id, 'notes': '',
                'dependent_on_id': Team.objects.get(name='4th Rail').id}

        response = self.client.post(reverse('dependency-list'), dependency, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, DependencySerializer(Dependency.objects.get()).data)
        self.assertTrue(Dependency.objects.get() in Commitment.objects.get().dependency_set.all())

    def test_query(self):
        '''Dependencies can be queried'''

        dependency = Dependency.objects.create(name='D1', commitment_id=Commitment.objects.get().id, notes='',
                dependent_on_id=Team.objects.get(name='4th Rail').id)

        response = self.client.get(reverse('dependency-list'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [DependencySerializer(dependency).data])

        response = self.client.get(reverse('dependency-detail', args=[dependency.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, DependencySerializer(dependency).data)

    def test_update(self):
        '''Dependencies can be updated'''

        dependency = DependencySerializer(Dependency.objects.create(name='D1', commitment_id=Commitment.objects.get().id, notes='',
                dependent_on_id=Team.objects.get(name='4th Rail').id)).data
        dependency.name = '1D'
        dependency.notes = 'blah'

        response = self.client.put(reverse('dependency-detail', args=[dependency['id']]), dependency, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, DependencySerializer(Dependency.objects.get()).data)

    def test_delete(self):
        '''Dependencies can be deleted'''

        dependency = DependencySerializer(Dependency.objects.create(name='D1', commitment_id=Commitment.objects.get().id, notes='',
                dependent_on_id=Team.objects.get(name='4th Rail').id)).data

        response = self.client.delete(reverse('dependency-detail', args=[dependency['id']]), dependency, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Dependency.objects.all().count(), 0)
