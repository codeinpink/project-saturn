from django.contrib import admin
from .models import Team, Feature, Commitment, Risk, Dependency

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'confidence',)
    list_filter = ('confidence',)

admin.site.register([Feature, Commitment, Risk, Dependency])
