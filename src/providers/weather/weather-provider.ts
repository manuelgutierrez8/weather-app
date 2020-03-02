import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { weatherImages } from '../../enum/weather-images';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = 'a6c728c6e427f5e9cf14f23a459d898e';
  defaultLocation = 'Managua,NI';
  weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast'

  constructor(public http: HttpClient) {
  }

  getCurrentWeatherByCity(location): Observable<any> {
    let queryString = this.setQueryString(location);

    return this.http.get<any>(`${this.weatherUrl}${queryString}`, { observe: 'response' });
  }

  getForecastByCity(location): Observable<any> {
    let queryString = this.setQueryString(location);

    return this.http.get<any>(`${this.forecastUrl}${queryString}`, { observe: 'response' });
  }

  private setQueryString(location) {
    let queryString = '?units=imperial';
    queryString += '&q=' + (location != '' ? location : this.defaultLocation);
    queryString += '&APPID=' + this.apiKey;

    return queryString;
  }

  setWeatherImage(icon: string) {
    let imagePath = 'assets/imgs/';
    
    imagePath += weatherImages[icon] ? weatherImages[icon] : 'dunno.png';

    return imagePath;
  }

}
