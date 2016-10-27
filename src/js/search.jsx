var React = require('react');
var ReactDOM = require('react-dom');

//Components
var Header = require('../components/header');
var SideMenu = require('../components/sideMenu');

//Mixins
var API = require('../mixins/APImixin');
var directionsRequest = require('../mixins/directionsRequest');
// var spotifyRequest = require('../mixins/spotifyRequest');
// var weatherRequest = require('../mixins/weatherRequest');
// var selectSongs = require('../mixins/selectSongs');

var App = React.createClass({
  mixins: [API],

  saveTrip: function() {
    var route = window.directionsResponse.routes[0].legs[0];
    var tripname = $('#tripname').val();

    var trip = JSON.stringify({
      tripname: tripname,
      start_latitude: route.start_location.lat() + '',
      start_longitude: route.start_location.lng() + '',
      end_latitude: route.end_location.lat() + '',
      end_longitude: route.end_location.lng() + ''
    });

    console.log('Saving trip', trip);
    var headers = {
      'Content-Type': 'application/json'
    };
    API.postApi('/api/trip', headers, trip, function(err, data) {
      console.log(data);
    });
  },

  generateNewPlaylist: () => {
    console.log('before function');
    var interval = setInterval(function() {
      console.log(window.directionsResponse);
      if (window.directionsResponse) {
        directionsRequest(window.directionsResponse, Date.now(), (placeArray) => {
          console.log(placeArray);
          clearInterval(interval);
        });
      }
    }, 1000); 
  },



  render() {
    return (
      <div>
      <header>
      	<Header />
      </header>
      <SideMenu />
      <main>
      	<div className="row">
					<div className="col s12 m9 l10">

            
            <form className="col s6">
              <div className="row">
                <div className="input-field col s5">
                  <input id="start" type="text" className="validate"></input>
                  <label>Start</label>
                </div>
                <div className="input-field col s5">
                  <input id="end" type="text" className="validate"></input>
                  <label>Destination</label>
                </div>
                <div className="input-field col s2">
                  <input className="btn waves-effect waves-light" type="button" id="submit" onClick={this.generateNewPlaylist} value="Preview Trip"></input>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s5">
                  <input id="tripname" type="text" className="validate"></input>
                  <label>Trip Name</label>
                </div>
                <div className="input-field col s1">
                  <input className="btn waves-effect waves-light" type="button" onClick={this.saveTrip} value="Save Trip"></input>
                </div>

              </div>
            </form>

          </div>

				</div>
      </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('App'));