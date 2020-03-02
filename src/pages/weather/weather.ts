import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather-provider';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

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
  errorLocation: any;
  currentLocation: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider,
    private geoLocation: Geolocation, private diagnostic: Diagnostic) {
  }

  ionViewWillEnter() {
    this.geoLocation.getCurrentPosition().then(resp => {
      this.currentLocation = {};
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.long = resp.coords.longitude;
      this.getWeatherInformation();
    }, err => {
      console.log('Using default coordinates, due to an error');
      console.log(err);
      this.getWeatherInformation();
    });
  }

  getWeatherInformation() {
    this.weatherProvider.getCurrentWeatherByCity(this.currentLocation).subscribe(response => {
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
