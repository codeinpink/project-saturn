from django.contrib import admin
from .models import Team, Feature, Commitment, Risk, Dependency

admin.site.register([Team, Feature, Commitment, Risk, Dependency])
