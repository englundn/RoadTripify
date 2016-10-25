var googleMapsApiKey = require('../config/apiKeys').googleMapsApiKey;
var googleMapsClient = require('@google/maps').createClient({
  key: googleMapsApiKey
});

// Makes a call to the google maps directions API to get route data
// https://developers.google.com/maps/documentation/javascript/directions
function getDirections(origin, destination, departureTime, callback) {
  
  // console.log(googleMapsClient);
  // console.log(googleMapsClient.directions);

  var request = {
    origin: origin,
    destination: destination,
    departure_time: departureTime,
    mode: 'driving',
    traffic_model: 'best_guess',
    optimize: true,
  };

  googleMapsClient.directions(request, function(error, response) {
    if(error) {
      // console.error('error', error);
      callback(error, null);
    } else {
      console.log('successfully retrieved directions');
      callback(null, response);
    }
  });

};

getDirections('San Francisco, CA', 'Seattle, WA', 
            new Date(Date.now()), 
            function(error, response) {
              console.log(JSON.stringify(response));
            });

module.exports = {
  getDirections: getDirections
}