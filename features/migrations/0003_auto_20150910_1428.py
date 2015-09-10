# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('features', '0002_auto_20150910_1421'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commitment',
            name='notes',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='dependency',
            name='notes',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='feature',
            name='clarity_or_jira_id',
            field=models.CharField(max_length=20, blank=True),
        ),
        migrations.AlterField(
            model_name='risk',
            name='notes',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='team',
            name='bug_buffer',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='team',
            name='confidence',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='team',
            name='num_jiras',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='team',
            name='planned_unplanned_work',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='team',
            name='previous_unplanned_work',
            field=models.FloatField(default=0),
        ),
    ]
