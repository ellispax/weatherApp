from django.utils import timezone
from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class Weather(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_time = models.DateTimeField(default=timezone.now())
    date = models.DateTimeField(auto_now_add=True)
    city = models.CharField(max_length=50)
    sunrise = models.TimeField()
    sunset = models.TimeField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    rain = models.CharField(max_length=100)
    pressure = models.FloatField()

    def __str__(self):
        return f"{self.city} - {self.temperature}°C ({self.user.username} - {self.date_time})"
