from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=255)
    bug_buffer = models.FloatField(default=0)
    num_jiras = models.PositiveSmallIntegerField(default=0)
    confidence = models.FloatField(default=0)
    previous_unplanned_work = models.FloatField(default=0)
    planned_unplanned_work = models.FloatField(default=0)

    def __unicode__(self):
        return self.name

class Feature(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    theme = models.CharField(max_length=30)
    teams = models.ManyToManyField(Team)
    clarity_or_jira_id = models.CharField(max_length=20, blank=True)

    def __unicode__(self):
        return self.name

class Commitment(models.Model):
    name = models.CharField(max_length=255)
    team = models.ForeignKey(Team)
    feature = models.ForeignKey(Feature)
    done_definition = models.CharField(max_length=50)
    status = models.CharField(max_length=30)
    start = models.CharField(max_length=10)
    stop = models.CharField(max_length=10)
    notes = models.TextField(blank=True)

    def __unicode__(self):
        return '{} - {} ({})'.format(self.name, self.feature, self.team)

class Risk(models.Model):
    name = models.CharField(max_length=255)
    commitment = models.ForeignKey(Commitment)
    probability = models.CharField(max_length=10)
    impact = models.CharField(max_length=10)
    severity = models.CharField(max_length=10)
    status = models.CharField(max_length=10)
    notes = models.TextField(blank=True)

    def __unicode__(self):
        return self.name

class Dependency(models.Model):
    name = models.CharField(max_length=255)
    commitment = models.ForeignKey(Commitment)
    dependent_on = models.ForeignKey(Team)
    notes = models.TextField(blank=True)

    def __unicode__(self):
        return self.name
