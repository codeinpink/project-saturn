from .models import Team, Feature, Commitment, Risk, Dependency
from rest_framework import serializers

class CommitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commitment
        fields = ('id', 'name', 'team', 'feature', 'done_definition', 'status',
                'start', 'stop', 'notes', 'risk_set', 'dependency_set')
        depth = 1

class FeatureSerializer(serializers.ModelSerializer):
    commitment_set = CommitmentSerializer(many=True)

    class Meta:
        model = Feature
        fields = ('id', 'name', 'description', 'theme', 'teams', 'clarity_or_jira_id',
                'commitment_set')
        depth = 2

class TeamSerializer(serializers.ModelSerializer):
    commitment_set = CommitmentSerializer(many=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'bug_buffer', 'num_jiras', 'confidence',
                'previous_unplanned_work', 'planned_unplanned_work', 'slug', 'feature_set',
                'commitment_set')
        depth = 2

class RiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Risk

class DependencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dependency