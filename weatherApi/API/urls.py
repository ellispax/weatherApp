from django.urls import path
from .views import WeatherView

urlpatterns = [
    #path('weather/', WeatherList.as_view(), name='weather-list'),
    # 
    
     path('weather/', WeatherView.as_view(), name='weather'),
 
]
