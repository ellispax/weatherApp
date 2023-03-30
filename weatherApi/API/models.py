from django.db import models

# Create your models here.

class Weather(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    city = models.CharField(max_length=50)
    sunrise = models.TimeField()
    sunset = models.TimeField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    rain = models.CharField(max_length=100)
    pressure = models.FloatField()

    def __str__(self):
        return f"{self.city} - {self.temperature}°C"
