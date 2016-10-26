var googleMapsApiKey = require('../config/apiKeys').googleMapsApiKey;
var googleMapsClient = require('@google/maps').createClient({
  key: googleMapsApiKey
});

// Makes a call to the google maps directions API to get route data
// https://developers.google.com/maps/documentation/javascript/directions
var getDirections = function(origin, destination, departureTime) {
  
  //Sample input: getDirections('San Francisco, CA', 'Seattle, WA', Date.now());

  // Sample output: [ { time: Wed Oct 26 2016 14:08:30 GMT-0700 (PDT),
  //                   lat: 37.7692352,
  //                   lng: -122.417882 },
  //                 { time: Wed Oct 26 2016 14:35:38 GMT-0700 (PDT),
  //                   lat: 38.033548887189546,
  //                   lng: -122.18291239098039 },
  //                 { time: Wed Oct 26 2016 15:05:38 GMT-0700 (PDT),
  //                   lat: 38.403755004836604,
  //                   lng: -121.86944486156862 }]
  
  var request = {
    'origin': origin,
    'destination': destination,
    'departure_time': departureTime,
    'mode': 'driving',
    'traffic_model': 'best_guess',
    'optimize': true,
  };

  googleMapsClient.directions(request, function(error, response) {
    if (error) {
      console.error('error', error);
    } else {
      var currentTime = departureTime;

      //generates an array of objects containing time and location for each Google Maps direction
      var wayPoints = response.json.routes[0].legs[0].steps.map(step => {
        currentTime += step.duration.value * 1000;
        return {
          time: currentTime,
          lat: step.end_location.lat,
          lng: step.end_location.lng
        };
      });


      //generates an array of times half an hour apart, starting at the start time of the trip
      //this is for generating weather data
      var timeInHalfHourIncrements = [wayPoints[0].time];
      while (departureTime < currentTime) {
        timeInHalfHourIncrements.push(departureTime += 30 * 60 * 1000);
      }


      //generates a location/time object at a middle time that occurs between a start object and an end object
      var interpolator = function(start, end, middleTime) {
        var deltaTime = (middleTime - start.time) / (end.time - start.time);
        var deltaLat = (end.lat - start.lat) * deltaTime;
        var deltaLng = (end.lng - start.lng) * deltaTime;
        return {
          time: middleTime,
          lat: start.lat + deltaLat,
          lng: start.lng + deltaLng
        };
      };

      //uses the time in half hour increments to generate interpolated coordinates from Google maps direction
      var halfHourWayPoints = [wayPoints[0]];
      var currentWayPointIndex = 0;
      for (var i = 1; i < timeInHalfHourIncrements.length; i++) {
        while (timeInHalfHourIncrements[i] > wayPoints[currentWayPointIndex].time && wayPoints[currentWayPointIndex + 1]) {
          currentWayPointIndex++;
        }
        var newPoint = interpolator(wayPoints[currentWayPointIndex - 1],
                                    wayPoints[currentWayPointIndex],
                                    timeInHalfHourIncrements[i]);
        halfHourWayPoints.push(newPoint);
      }

      //Converts time properties into date objects
      halfHourWayPoints = halfHourWayPoints.map(function(waypoint) {
        waypoint.time = new Date(waypoint.time);
        return waypoint;
      });

      console.log(halfHourWayPoints);
      return halfHourWayPoints;
    }
  });

};

getDirections('San Francisco, CA', 'Seattle, WA', Date.now());

module.exports = getDirections;