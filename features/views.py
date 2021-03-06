from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Team, Feature, Commitment, Risk, Dependency
from rest_framework import viewsets
from .serializers import TeamSerializer, FeatureSerializer, CommitmentSerializer, \
                        RiskSerializer, DependencySerializer

def index(request):
    return render(request, 'features/index.html', {})

@ensure_csrf_cookie
def team(request, slug):
    team = get_object_or_404(Team, slug=slug)
    return render(request, 'features/team.html', {'team': team})

def all_commitments(request):
    return render(request, 'features/commitments.html', {})

def all_features(request):
    return render(request, 'features/features.html', {})

def all_teams(request):
    return render(request, 'features/teams.html', {})

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all().order_by('name')
    serializer_class = FeatureSerializer

class CommitmentViewSet(viewsets.ModelViewSet):
    queryset = Commitment.objects.all().order_by('name')
    serializer_class = CommitmentSerializer

    def perform_create(self, serializer):
        commitment = serializer.save(feature_id=self.request.data['feature_id'], team_id=self.request.data['team_id'])

        if commitment.team not in commitment.feature.teams.all(): commitment.feature.teams.add(commitment.team)

        return commitment

class RiskViewSet(viewsets.ModelViewSet):
    queryset = Risk.objects.all().order_by('name')
    serializer_class = RiskSerializer

    def perform_create(self, serializer):
        serializer.save(commitment_id=self.request.data['commitment_id'])

class DependencyViewSet(viewsets.ModelViewSet):
    queryset = Dependency.objects.all().order_by('name')
    serializer_class = DependencySerializer

    def perform_create(self, serializer):
        serializer.save(commitment_id=self.request.data['commitment_id'], dependent_on_id=self.request.data['dependent_on_id'])
