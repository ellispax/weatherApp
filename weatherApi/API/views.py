import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
import requests

class WeatherView(APIView):
    def get(self, request, *args, **kwargs):
        city = request.query_params.get('city')
        if city:
            url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=c263e33729247d585b1bf41636fc4062'
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                weather_data = {
                    'city': data['name'],
                    'temperature': data['main']['temp'],
                    'humidity': data['main']['humidity'],
                    'pressure': data['main']['pressure'],
                    'sunrise': data['sys']['sunrise'],
                    'sunset': data['sys']['sunset'],
                    'rain':data['weather'][0]['description'],
                    # 'rain': data.get('rain', {}).get('1h', 0),
                }
                return Response(weather_data)
        return Response({'message': 'Invalid parameters'}, status=400)



# 