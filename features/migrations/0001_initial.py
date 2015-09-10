# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Commitment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('done_definition', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=30)),
                ('start', models.CharField(max_length=10)),
                ('stop', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Dependency',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('notes', models.TextField()),
                ('commitment', models.ForeignKey(to='features.Commitment')),
            ],
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('theme', models.CharField(max_length=30)),
                ('clarity_or_jira_id', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Risk',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('probability', models.CharField(max_length=10)),
                ('impact', models.CharField(max_length=10)),
                ('severity', models.CharField(max_length=10)),
                ('status', models.CharField(max_length=10)),
                ('notes', models.TextField()),
                ('commitment', models.ForeignKey(to='features.Commitment')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('team', models.CharField(max_length=255)),
                ('bug_buffer', models.FloatField()),
                ('num_jiras', models.PositiveSmallIntegerField()),
                ('confidence', models.FloatField()),
                ('previous_unplanned_work', models.FloatField()),
                ('planned_unplanned_work', models.FloatField()),
            ],
        ),
        migrations.AddField(
            model_name='feature',
            name='teams',
            field=models.ManyToManyField(to='features.Team'),
        ),
        migrations.AddField(
            model_name='dependency',
            name='dependent_on',
            field=models.ForeignKey(to='features.Team'),
        ),
        migrations.AddField(
            model_name='commitment',
            name='feature',
            field=models.ForeignKey(to='features.Feature'),
        ),
        migrations.AddField(
            model_name='commitment',
            name='team',
            field=models.ForeignKey(to='features.Team'),
        ),
    ]
