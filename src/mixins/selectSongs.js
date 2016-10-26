var db = require('../../server/db/dbConfig');
var playListController = require('../../server/db/controller/savedPlaylist');
// Soak Up The Sun', /* beachy vibes */
// 'Autumn Leaves', /* rainy day fall vibes */
// 'Life Sucks',  bad day vibes 
// 'Afternoon Acoustic', /* self-explanatory */
// 'Songs for Sunsets',
// 'Mood Booster' /* happy songs */

var getTime = function(time) {
  if (6 <= time.getHours() && time.getHours() < 12) {
    return 'morning';
  } else if (12 <= time.getHours() && time.getHours() < 17) {
    return 'afternoon';
  } else if (17 <= time.getHours() && time.getHours() < 7) {
    return 'evening';
  } else {
    return 'night';
  }
};

var getWeather = function(weatherIcon) {
  if ([1, 2, 3, 4, 5, 30].indexOf(weatherIcon) > -1) {
    return 'sunny';
  } else if ([6, 7, 8, 11, 31, 32].indexOf(weatherIcon) > -1) {
    return 'cloudy';
  } else if (weatherIcon <= 32) {
    return 'rain/snow';
  } else if (weatherIcon <= 37) {
    return 'dry night';
  } else {
    return 'dark and stormy night';
  }
};

var selectSongs = function(time, weather, callback) {
  console.log(time);
  var playlist = '';
  var weatherDescrip = getWeather(weather.WeatherIcon);
  var timeDescrip = getTime(time);
  console.log(timeDescrip);
  console.log('weather', weather.WeatherIcon);

  if (timeDescrip === 'morning') {
    if (weatherDescrip === 'sunny' || weatherDescrip === 'cloudy') {
      playlist = 'Mood Booster';
    } else if (weatherDescrip === 'rain/snow') {
      playlist = 'Life Sucks';
    }
  } else if (timeDescrip === 'afternoon') {
    if (weatherDescrip === 'sunny') {
      playlist = 'Soak Up The Sun';
    } else if (weatherDescrip === 'cloudy') {
      playlist = 'Afternoon Acoustic';
    } else {
      playlist = 'Autumn Leaves';
    }
  } else if (timeDescrip === 'evening' || timeDescrip === 'night') {
    if (weatherDescrip === 'sunny' || weatherDescrip === 'dry night') {
      playlist = 'Songs for Sunsets';
    } else {
      playlist = 'Autumn Leaves';
    }
  }


  if (playlist === '') {
    console.log('no playlist selected');
    throw error;
  }

  //total number of milliseconds in 30 min
  var remainingTime = 60000 * 30;
  console.log(playlist);

  playListController.findOne(playlist, function(err, data) {
    if (err) {
      console.log(err);
    }
    var songChoices = JSON.parse(data.uri_array);
    var song_uris = [];
    var randIndex = 0;

    while (remainingTime > 120000) {
      randIndex = Math.floor(Math.random() * songChoices.length);
      song_uris.push(songChoices[randIndex][0]);
      remainingTime -= songChoices[randIndex][1];
      console.log(remainingTime, 'subtracted', songChoices[randIndex][1]);
      songChoices.splice(randIndex, 1);
    }

    callback(song_uris);
  });

};

var date = new Date();
var weatherEx = {
  "DateTime": "2016-10-26T11:00:00-07:00",
  "EpochDateTime": 1477504800,
  "WeatherIcon": 6,
  "IconPhrase": "Mostly cloudy",
  "IsDaylight": true,
  "Temperature": {
    "Value": 65,
    "Unit": "F",
    "UnitType": 18
  },
  "RealFeelTemperature": {
    "Value": 66,
    "Unit": "F",
    "UnitType": 18
  },
  "WetBulbTemperature": {
    "Value": 59,
    "Unit": "F",
    "UnitType": 18
  },
  "DewPoint": {
    "Value": 54,
    "Unit": "F",
    "UnitType": 18
  },
  "Wind": {
    "Speed": {
      "Value": 6.9,
      "Unit": "mi/h",
      "UnitType": 9
    },
    "Direction": {
      "Degrees": 137,
      "Localized": "SE",
      "English": "SE"
    }
  },
  "WindGust": {
    "Speed": {
      "Value": 9.2,
      "Unit": "mi/h",
      "UnitType": 9
    }
  },
  "RelativeHumidity": 68,
  "Visibility": {
    "Value": 8,
    "Unit": "mi",
    "UnitType": 2
  },
  "Ceiling": {
    "Value": 18500,
    "Unit": "ft",
    "UnitType": 0
  },
  "UVIndex": 2,
  "UVIndexText": "Low",
  "PrecipitationProbability": 7,
  "RainProbability": 7,
  "SnowProbability": 0,
  "IceProbability": 0,
  "TotalLiquid": {
    "Value": 0,
    "Unit": "in",
    "UnitType": 1
  },
  "Rain": {
    "Value": 0,
    "Unit": "in",
    "UnitType": 1
  },
  "Snow": {
    "Value": 0,
    "Unit": "in",
    "UnitType": 1
  },
  "Ice": {
    "Value": 0,
    "Unit": "in",
    "UnitType": 1
  },
  "CloudCover": 81,
  "MobileLink": "http://m.accuweather.com/en/us/south-of-market-ca/94103/hourly-weather-forecast/2628204?day=1&hbhhour=11&lang=en-us",
  "Link": "http://www.accuweather.com/en/us/south-of-market-ca/94103/hourly-weather-forecast/2628204?day=1&hbhhour=11&lang=en-us"
};

selectSongs(date, weatherEx, function(songs) {
  console.log(songs);
});