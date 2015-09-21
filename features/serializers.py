from .models import Team, Feature, Commitment, Risk, Dependency
from rest_framework import serializers

class RiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Risk
        fields = ['id', 'name', 'commitment', 'probability', 'impact', 'severity', 'resolution', 'notes']
        depth = 2

class DependencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dependency
        fields = ['id', 'name', 'commitment', 'dependent_on', 'notes']
        depth = 2

class CommitmentSerializer(serializers.ModelSerializer):
    risk_set = RiskSerializer(many=True, read_only=True)
    dependency_set = DependencySerializer(many=True, read_only=True)

    class Meta:
        model = Commitment
        fields = ('id', 'name', 'team', 'feature', 'done_definition', 'status',
                'start', 'stop', 'notes', 'risk_set', 'dependency_set')
        depth = 1

class FeatureSerializer(serializers.ModelSerializer):
    commitment_set = CommitmentSerializer(many=True, read_only=True)

    class Meta:
        model = Feature
        fields = ('id', 'name', 'description', 'theme', 'teams', 'clarity_or_jira_id',
                'url', 'commitment_set')
        depth = 2

class TeamSerializer(serializers.ModelSerializer):
    commitment_set = CommitmentSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'bug_buffer', 'num_jiras', 'confidence',
                'previous_unplanned_work', 'planned_unplanned_work', 'slug', 'feature_set',
                'commitment_set')
        depth = 2
