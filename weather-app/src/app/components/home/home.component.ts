import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent {

constructor(private http: HttpClient) { }

cityName: string = '';
dateTime: string = '';
temperature: number = 0;
humidity: number = 0;
pressure: number = 0;
windSpeed: number = 0;
windDirection: string = '';
sunrise: string = '';
sunset: string = '';
rain: string = '';
map:any

ngOnInit(): void {
this.initMap();
}

initMap() {
this.map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
maxZoom: 18
}).addTo(this.map);
}

getWindDirection(degrees: number) {
const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const index = Math.round(degrees / 45) % 8;
return directions[index];
}

getWeatherData(city: string) {
const url = `http://localhost:8000/API/weather/?city=${city}`;
this.http.get(url).subscribe((data: any) => {
this.cityName = data.city;
this.dateTime = new Date().toLocaleString();
this.temperature = data.temperature;
this.humidity = data.humidity;
this.pressure = data.pressure;
this.windSpeed = data.wind_speed;
this.windDirection = this.getWindDirection(data.wind_direction);
this.sunrise = data.sunrise;
this.sunset = data.sunset;
this.rain = data.rain;
const latitude = data.lat;
const longitude = data.lon;
this.map.setView([latitude, longitude], 13);
L.marker([latitude, longitude]).addTo(this.map);
});
}
}


// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import * as L from 'leaflet';


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent {

//   constructor(private http: HttpClient) { }

//   cityName: string = '';
//   dateTime: string = '';
//   temperature: number = 0;
//   humidity: number = 0;
//   pressure: number = 0;
//   windSpeed: number = 0;
//   windDirection: string = '';
//   sunrise: string = '';
//   sunset: string = '';
//   rain: string = '';
//   map:any

//   ngOnInit(): void {
//     this.getWeatherData('London');
//     this.initMap();
//   }

//   initMap() {
//     this.map = L.map('map').setView([51.505, -0.09], 13);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//       maxZoom: 18
//     }).addTo(this.map);
//   }
  

//   getWindDirection(degrees: number) {
//     const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
//     const index = Math.round(degrees / 45) % 8;
//     return directions[index];
//   }

//   getWeatherData(city: string) {
//     const url = `http://localhost:8000/API/weather/?city=${city}`;
//     this.http.get(url).subscribe((data: any) => {
//       this.cityName = data.city;
//       this.dateTime = new Date().toLocaleString();
//       this.temperature = data.temperature;
//       this.humidity = data.humidity;
//       this.pressure = data.pressure;
//       this.windSpeed = data.wind_speed;
//       this.windDirection = this.getWindDirection(data.wind_direction);
//       this.sunrise = data.sunrise;
//       this.sunset = data.sunset;
//       this.rain = data.rain;
//     });

// }
// }
