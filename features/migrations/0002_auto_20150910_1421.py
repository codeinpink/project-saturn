# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('features', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='team',
            old_name='team',
            new_name='name',
        ),
        migrations.AddField(
            model_name='commitment',
            name='name',
            field=models.CharField(default='Team1', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='commitment',
            name='notes',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='commitment',
            name='done_definition',
            field=models.CharField(max_length=50),
        ),
    ]
