from django.shortcuts import render, get_object_or_404
from .models import Team, Feature, Commitment, Risk, Dependency
from rest_framework import viewsets
from .serializers import TeamSerializer, FeatureSerializer, CommitmentSerializer, \
                        RiskSerializer, DependencySerializer

def index(request):
    return render(request, 'features/index.html', {})

def team(request, slug):
    return render(request, 'features/team.html', {})

def all_teams(request):
    return render(request, 'features/allFeatures.html', {})

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all().order_by('name')
    serializer_class = FeatureSerializer

class CommitmentViewSet(viewsets.ModelViewSet):
    queryset = Commitment.objects.all().order_by('name')
    serializer_class = CommitmentSerializer

class RiskViewSet(viewsets.ModelViewSet):
    queryset = Risk.objects.all().order_by('name')
    serializer_class = RiskSerializer

class DependencyViewSet(viewsets.ModelViewSet):
    queryset = Dependency.objects.all().order_by('name')
    serializer_class = DependencySerializer
