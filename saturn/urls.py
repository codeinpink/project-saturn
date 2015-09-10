"""saturn URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from features import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'teams', views.TeamViewSet)
router.register(r'features', views.FeatureViewSet)
router.register(r'commitments', views.CommitmentViewSet)
router.register(r'risks', views.RiskViewSet)
router.register(r'dependencies', views.DependencyViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^all$', views.all_teams, name='all_teams'),
    url(r'^(?P<slug>[\w-]+)/$', views.team, name='team'),
    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
]
