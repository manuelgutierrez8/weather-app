import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentWeatherProvider } from '../../providers/weather/CurrenWeather';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: CurrentWeatherProvider) {
  }

  ionViewWillEnter() {
    this.weatherProvider.getCurrentWeatherByCity('').subscribe(response => {
      if(response.status == 200 ) {
        let data = response.body;

        this.currentWeather = {};
        this.currentWeather.temperature = data.main.temp;
        this.currentWeather.name = '';

        if(data.weather.length > 0) {
          this.currentWeather.name = data.weather[0].main;
        }
      }
      console.log(response);
    });
  }

}
