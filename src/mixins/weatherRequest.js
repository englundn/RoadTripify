var apiKey = require('../config/apiKeys.js').accuWeatherApiKey;

var weatherRequest = (latitude, longitude, datetime, callback) => {
//send get request for location key
  $.ajax({
    method: 'GET',
    url: 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
    jsonp: 'callback',
    data: { apikey: apiKey, 
      q: '' + latitude + ',' + longitude},
    dataType: 'jsonp',
    success: (response) => {
      var locationKey = response.Key;
      //send get request for hourly forecast using location key
      $.ajax({
        method: 'GET',
        url: 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + locationKey,
        jsonp: 'callback',
        data: { apikey: apiKey, 
          details: true},
        dataType: 'jsonp',
        success: (response) => {
          //find hour with closest time to datetime input
          var closestIndex = 0;
          var currentClosest = Math.abs(new Date(response[0].DateTime) - datetime);
          for ( var i = 0; i < response.length; i++ ) {
            if (Math.abs(new Date(response[i].DateTime) - datetime) < currentClosest) {
              currentClosest = Math.abs(new Date(response[i].DateTime) - datetime);
              closestIndex = i;
            }
          }
          //call callback on results object
          callback({
            latitude: latitude,
            longitude: longitude,
            time: datetime,
            weather: response[closestIndex]
          });
        }, 
        error: (response) => {
          console.log(response);
        }
      });
    }, 
    error: (response) => {
      console.log(response);
    }
  });
};

//for now, comment this out for mocha tests to run in browser
module.exports = weatherRequest;

// example usage
// weatherRequest('37.7836966', '-122.4111551', new Date('10-20-2016 17:48:00'), function(obj) { console.log(obj); });