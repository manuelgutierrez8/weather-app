import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather-provider';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
})
export class ForecastPage {
  forecastList: any;
  error: any;
  currentLocation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider,
    private geoLocation: Geolocation) {
  }

  ionViewWillEnter() {
    this.geoLocation.getCurrentPosition().then(resp => {
      this.currentLocation = {};
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.long = resp.coords.longitude;
      this.getForecastInformation();
    }, err => {
      console.log('Using default coordinates, due to an error');
      console.log(err);
      this.getForecastInformation();
    });
  }

  getForecastInformation() {
    this.weatherProvider.getForecastByCity(this.currentLocation).subscribe(response => {
      if (response.status == 200) {
        this.createDailyForecast(response.body.list);
      }
    },
      err => {
        this.error = {
          message: err.error.message,
          code: err.error.cod
        }
      }
    );
  }

  createDailyForecast(list: Array<any>) {
    this.forecastList = [];
    //Select only the date i.e '2020-03-02'
    let dates = new Set(list.map(a => a.dt_txt.substring(0, 10)));

    dates.forEach(date => {
      //get items by each day
      let dayForecast = list.filter(x => x.dt_txt.includes(date));
      let day: any = {};

      day.tempMin = dayForecast.reduce((min, p) => p.main.temp_min < min ? p.main.temp_min : min, dayForecast[0].main.temp_min);
      day.tempMax = dayForecast.reduce((max, p) => p.main.temp_max > max ? p.main.temp_max : max, dayForecast[0].main.temp_max);
      day.description = dayForecast[0].weather[0].main;
      day.icon = this.weatherProvider.setWeatherImage(dayForecast[0].weather[0].icon);
      day.date = date;

      //Add to main list
      this.forecastList.push(day);
    });
  }

}
