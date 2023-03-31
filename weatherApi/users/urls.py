from django.urls import path
from .views import LoginView, CreateUserView, LogoutView

urlpatterns = [
    #path('weather/', WeatherList.as_view(), name='weather-list'),
    # 
    
     path('login',LoginView.as_view() , name='login'),
     path('create-user', CreateUserView.as_view(), name='create-user'),
     path('logout', LogoutView.as_view(), name='logout')
 
]
