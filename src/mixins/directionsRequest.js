var googleMapsApiKey = require('../config/apiKeys').googleMapsApiKey;
var googleMapsClient = require('@google/maps').createClient({
  key: googleMapsApiKey
});

// Makes a call to the google maps directions API to get route data
// https://developers.google.com/maps/documentation/javascript/directions
var getDirections = function(origin, destination, departureTime) {
  
  // console.log(googleMapsClient);
  // console.log(googleMapsClient.directions);

  var request = {
    'origin': origin,
    'destination': destination,
    'departure_time': new Date(departureTime),
    'mode': 'driving',
    'traffic_model': 'best_guess',
    'optimize': true,
  };

  googleMapsClient.directions(request, function(error, response) {
    if (error) {
      console.error('error', error);
      // callback(error, null);
    } else {
      // console.log('successfully retrieved directions');
      // callback(null, response);
      var currentTime = departureTime;
      var wayPoints = response.json.routes[0].legs[0].steps.map(step => {
        currentTime += step.duration.value;
        return {time: new Date(currentTime),
                lat: step.end_location.lat,
                lng: step.end_location.lng};
      });
      console.log(wayPoints);
      return wayPoints;     
    }
  });

};

getDirections('San Francisco, CA', 'Seattle, WA', Date.now());

module.exports = {
  getDirections: getDirections
};