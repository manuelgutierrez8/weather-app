import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather-provider';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  currentWeather: any;
  error: any;
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider) {
  }

  ionViewWillEnter() {
    this.weatherProvider.getCurrentWeatherByCity('').subscribe(response => {
      if (response.status == 200) {
        let data = response.body;

        this.currentWeather = {};
        this.currentWeather.temperature = data.main.temp;
        this.currentWeather.description = '';

        if (data.weather.length > 0) {
          this.currentWeather.description = data.weather[0].main;
          this.currentWeather.image = this.weatherProvider.setWeatherImage(data.weather[0].icon);
        }
      }
    },
      err => {
        console.log(err);
        this.error = {
          message: err.error.message,
          code: err.error.cod
        }
      }
    );
  }

}
