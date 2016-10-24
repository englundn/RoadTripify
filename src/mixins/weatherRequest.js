var apiKey = "bZ9pAz6UosGaNDG5AfWe0wt8MGO9GGdX";

var weatherRequest = function(latitude, longitude, datetime, callback) {
//send get request for location key
  $.ajax({
    method: "GET",
    url: "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
    /*jsonp: "callback",*/
    data: { apikey: apiKey, 
      q: latitude + ',' + longitude},
    dataType: 'json',
    success: function(response) {
      var locationKey = response.Key;
      //send get request for hourly forecast using location key
      $.ajax({
        method: "GET",
        url: "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" + locationKey,
        jsonp: "callback",
        data: { apikey: apiKey, 
          details: true},
        dataType: 'jsonp',
        success: function(response) {
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
        error: function(response) {
          console.log(response);
        }
      });
    }, 
    error: function(response) {
      console.log(response);
    }
  });
};

module.exports = {
  weatherRequest: weatherRequest
};

// example usage
var datezz = new Date('10-20-2016 17:48:00');
weatherRequest('37.7836966', '-122.4111551', datezz, function(obj) { console.log(obj); });