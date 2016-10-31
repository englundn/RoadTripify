var getDirections = (response, departureTime, callback) => {
  var currentTime = departureTime;

  //generates an array of objects containing time and location for each Google Maps direction
  var wayPoints = response.routes[0].legs[0].steps.map(step => {
    currentTime += step.duration.value * 1000;
    return {
      time: currentTime,
      lat: step.end_location.lat(),
      lng: step.end_location.lng()
    };
  });


  //generates an array of times half an hour apart, starting at the start time of the trip
  //this is for generating weather data
  var timeInHalfHourIncrements = [wayPoints[0].time];
  while (departureTime < currentTime) {
    timeInHalfHourIncrements.push(departureTime += 30 * 60 * 1000);
  }


  //generates a location/time object at a middle time that occurs between a start object and an end object
  var interpolator = (start, end, middleTime) => {
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
  halfHourWayPoints = halfHourWayPoints.map((waypoint) => {
    waypoint.time = new Date(waypoint.time);
    return waypoint;
  });

  callback(halfHourWayPoints);
};

module.exports = getDirections;