# Weather App

This is a demo app that contains two tabs:

### Weather Tab
This will display the current weather based on your geo location.
It will display 3 Fields:

* Temperature on ºF
* Image
* Description

### Forecast Tab
This will display a weather forescast for the following 5 days. Each item on the list contains the following information:

* Image
* Date
* Description
* Min Temperature
* Max Temperature


## Running the app
Open your console and run the following command

```npm install```

```ionic serve```

in case that you want to check this on mobile devices instead of the browser use the following commands. 

- Don't forget to enable your geo localization 😅
- And don't forget to have your emulator running 

```ionic cordova run android```

or

```ionic cordova run ios```

## Changing default values
This application is configured to display information from **Managua, Nicaragua** by default (in case that geo location is not enabled). If you want to change this or your API Key for OpenWeather service, you can modify the following variables defined on ```src\providers\weather\weather-provider.ts ```

```
    apiKey = 'newAPIKey';

    //Numeric values
    defaultLocation = {
        lat: 12.1150,
        long: 86.2362
    }
```


