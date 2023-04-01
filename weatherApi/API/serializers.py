from rest_framework import serializers
from .models import Weather

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('id', 'date', 'city', 'sunrise', 'sunset', 'temperature', 'humidity', 'rain', 'pressure', 'user','wind_speed', 'wind_direction', 'lat', 'lon')
