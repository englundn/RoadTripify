var APIMixin = require('./APImixin');
// Soak Up The Sun', /* beachy vibes */
// 'Autumn Leaves', /* rainy day fall vibes */
// 'Life Sucks',  bad day vibes 
// 'Afternoon Acoustic', /* self-explanatory */
// 'Songs for Sunsets',
// 'Mood Booster' /* happy songs */

var getTime = (time) => {
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

var getWeather = (weatherIcon) => {
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

var selectSongs = (time, weather, callback) => {
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


  if (playlist === '') {
    console.log('no playlist selected');
    throw error;
  }

  //total number of milliseconds in 30 min
  var remainingTime = 60000 * 30;

  var headers = {
    'Content-Type': 'application/json'
  };

  APIMixin.postApi('/api/savedplaylists', headers, JSON.stringify({name: playlist}), (err, data) => {
    if (err) {
      console.log(err);
    }
    var songChoices = JSON.parse(data);
    var songUris = [];
    var randIndex = 0;

    while (remainingTime > 120000) {
      randIndex = Math.floor(Math.random() * songChoices.length);
      songUris.push(songChoices[randIndex][0]);
      remainingTime -= songChoices[randIndex][1];
      songChoices.splice(randIndex, 1);
    }

    callback(songUris);
  });

};

module.exports = selectSongs;

//example case
// var date = new Date();
// var weatherEx= {
//   "DateTime": "2016-10-26T11:00:00-07:00",
//   "EpochDateTime": 1477504800,
//   "WeatherIcon": 6,
//   "IconPhrase": "Mostly cloudy",
// };

// selectSongs(date, weatherEx, function(songs) {
//   console.log(songs);
// });