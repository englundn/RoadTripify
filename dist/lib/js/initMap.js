var initMap = () => {

  var directionsService = new google.maps.DirectionsService();

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.786, lng: -122.405},
    scrollwheel: false,
    zoom: 7
  });


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('Found user position', pos);

      map.setCenter(pos);
      window.userLocation = pos;
      $('input.autocomplete').autocomplete({
        data: {
          'Use My Location': null
        }
      });

    }, function() {
      console.log('user did not allow location tracking');
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  

  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });


  directionsDisplay.setPanel(document.getElementById('right-panel'));

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    if (document.getElementById('start').value === 'Use My Location') {
      var start = window.userLocation;
    } else {
      start = document.getElementById('start').value;
    }

    var end = document.getElementById('end').value;

    console.log(start);
    console.log(end);

    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        console.log(response);
        directionsDisplay.setDirections(response);
        window.directionsResponse = response;
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };



  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  
  //document.getElementById('submit').addEventListener('click', onChangeHandler);
  $('#App').on('click', '.save-trip-btn', onChangeHandler);
}