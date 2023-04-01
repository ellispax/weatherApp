# Generated by Django 4.1.5 on 2023-04-01 05:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_alter_weather_date_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='weather',
            name='wind_direction',
            field=models.CharField(default='N', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='weather',
            name='wind_speed',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='weather',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 4, 1, 5, 44, 47, 576823, tzinfo=datetime.timezone.utc)),
        ),
    ]