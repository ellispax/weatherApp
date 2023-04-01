import datetime
from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Weather
import pytz
from django.utils import timezone
from django.contrib.auth.models import User
import requests
from API.serializers import WeatherSerializer

# class WeatherView(APIView):

class WeatherView(APIView):
    

    def get(self, request, *args, **kwargs):
        city = request.query_params.get('city')
        if city:
            url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=<YOUR API KEY>'
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                sunrise =  datetime.datetime.utcfromtimestamp(data['sys']['sunrise']).strftime('%H:%M:%S')
                sunset = datetime.datetime.utcfromtimestamp(data['sys']['sunset']).strftime('%H:%M:%S')
                
                weather_data = {
                    'city': data['name'],
                    'temperature': data['main']['temp'],
                    'humidity': data['main']['humidity'],
                    'pressure': data['main']['pressure'],
                    'sunrise': sunrise,
                    'sunset': sunset,
                    'rain':data['weather'][0]['description'],
                    'wind_speed': data['wind']['speed'],
                    'wind_direction': data['wind']['deg'],
                    'lat':data['coord']['lat'],
                    'lon':data['coord']['lon']
                    # 'rain': data.get('rain', {}).get('1h', 0),
                }
                user = request.user if request.user.is_authenticated else None
                weather_data['user'] = user.id if user else 1
                serializer = WeatherSerializer(data=weather_data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=400)
        return Response({'message': 'Invalid parameters'}, status=400)
    authentication_classes = [authentication.SessionAuthentication]

    


# 
