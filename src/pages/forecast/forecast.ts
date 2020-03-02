import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather-provider';
import { debugOutputAstAsTypeScript } from '@angular/compiler';


@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
})
export class ForecastPage {
  forecastList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private weatherProvider: WeatherProvider) {
  }

  ionViewWillEnter() {
    this.weatherProvider.getForecastByCity('').subscribe(response => {
      if (response.status == 200) {
        //console.log(response.body);
        this.createDailyForecast(response.body.list);
      }
    });
  }

  createDailyForecast(list: Array<any>) {
    this.forecastList = [];
    //Select only the date i.e '2020-03-02'
    let dates = new Set(list.map(a=>a.dt_txt.substring(0,10)));

    dates.forEach(date => {
      //get items by each day
      let dayForecast = list.filter(x=>x.dt_txt.includes(date));
      let day : any = {};

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
