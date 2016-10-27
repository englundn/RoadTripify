function initMap() {

  var directionsService = new google.maps.DirectionsService();

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.85, lng: -87.65},
    scrollwheel: false,
    zoom: 7
  });

  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });


  directionsDisplay.setPanel(document.getElementById('right-panel'));

  // var control = document.getElementById('floating-panel');
  // control.style.display = 'block';
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  var onChangeHandler = function() {
    console.log("test");
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  //document.getElementById('submit').addEventListener('click', onChangeHandler);
  $('#App').on('click', '.save-trip-btn', onChangeHandler);

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
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
  }

}