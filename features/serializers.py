from .models import Team, Feature, Commitment, Risk, Dependency
from rest_framework import serializers

class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team

class FeatureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Feature

class CommitmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Commitment

class RiskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Risk
        
class DependencySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dependency
