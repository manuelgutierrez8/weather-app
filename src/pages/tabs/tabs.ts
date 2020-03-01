import { Component } from '@angular/core';

import { WeatherPage } from '../weather/weather';
import { ForecastPage  } from "../forecast/forecast";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = WeatherPage;
  tab2Root = ForecastPage;

  constructor() {

  }
}
