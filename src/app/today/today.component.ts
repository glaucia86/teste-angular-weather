import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  lat;
  lon;
  weather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      });
    }
  }

  getCity(city) {
    this.weatherService.getWeatherDataByCityName(city).subscribe((data: any) => {
      this.weather = data;

      this.lat = data.coord.lat;
      this.lon = data.coord.lon;
    });
  }

  getCoords(event) {
    this.lat = event.coords.lat;
    this.lon = event.coords.lng;

    this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
      this.weather = data;
    });
  }
}
