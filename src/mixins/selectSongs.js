// input:
// callback({
//   latitude: latitude,
//   longitude: longitude,
//   time: datetime,
//   weather: response[closestIndex]
// });
// output: songUriArray

// '1KuPMhQ4z7oIq3zdQEZP0V': 'Soak Up The Sun', /* beachy vibes */
// '2gtr2Tf686zXqjQNiYNPQW': 'Autumn Leaves', /* rainy day fall vibes */
// '5eSMIpsnkXJhXEPyRQCTSc': 'Life Sucks',  bad day vibes 
// '16BpjqQV1Ey0HeDueNDSYz': 'Afternoon Acoustic', /* self-explanatory */
// '7jyyxDxMmtNs1UeLEOpJcE': 'Songs for Sunsets',
// '6uTuhSs7qiEPfCI3QDHXsL': 'Mood Booster' /* happy songs */

var getTime = function(time) {
  if (6 <= time.getHours() && time.getHours() < 12) {
    return 'morning';
  } else if (12 <= time.getHours() && time.getHours() < 5) {
    return 'afternoon';
  } else if (5 <= time.getHours() && time.getHours() < 7) {
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

var selectSongs = function(time, weather) {
  var playlist = '';
  var weatherDescrip = getWeather(weather.WeatherIcon);
  var timeDescrip = getTime(time);

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


};