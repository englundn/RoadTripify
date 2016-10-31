var React = require('react');
var ReactDOM = require('react-dom');

//Components
var Header = require('../components/header');
var SideMenu = require('../components/sideMenu');

//Mixins
var API = require('../mixins/APImixin');
var directionsRequest = require('../mixins/directionsRequest');
var weatherRequest = require('../mixins/weatherRequest');
var selectSongs = require('../mixins/selectSongs');
var spotifyRequest = require('../mixins/spotifyRequest');

//Global vars
var finalPlaylistID = '';

var App = React.createClass({
  getInitialState: function() {
    return {
      playlistUri: ''
    };
  },

  mixins: [API],

  saveTrip: function() {
    var route = window.directionsResponse.routes[0].legs[0];
    var tripname = $('#tripname').val() || $('#start').val() + ' to ' + $('#end').val();

    var context = this;

    context.geocodeLatLng(route.start_location.lng(), route.start_location.lat(), function(startAddress) {
      context.geocodeLatLng(route.end_location.lng(), route.end_location.lat(), function(endAddress) {
        var trip = JSON.stringify({
          'tripname': tripname,
          'playlist_uri': finalPlaylistID,
          'start_latitude': route.start_location.lat() + '',
          'start_longitude': route.start_location.lng() + '',
          'end_latitude': route.end_location.lat() + '',
          'end_longitude': route.end_location.lng() + '',
          'start_address': startAddress,
          'end_address': endAddress
        });

        // console.log('Saving trip', trip);
        var headers = {
          'Content-Type': 'application/json'
        };
        API.postApi('/api/trip', headers, trip, function(err, data) {
          if (err) {
            console.error(err);
          }
          // console.log(data);
          finalPlaylistID = '';
        });

      });
    });
  },

  geocodeLatLng: function(long, lati, cb) {
    var geocoder = new google.maps.Geocoder;
    var latlng = {lat: lati, lng: long};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          // console.log(results);
          cb(results[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  },

  generateNewPlaylist: function() {


    var context = this;
    var waitingForMapData = setInterval(function() {
      if (window.directionsResponse) {
        directionsRequest(window.directionsResponse, Date.now(), (placeArray) => {
          var counter = 0;
          var arrayofSongArrays = new Array(placeArray.length);
          placeArray.map((place, index) => {
            return weatherRequest(place.lat, place.lng, place.time, (placeWeather) => {
              return selectSongs(placeWeather.time, placeWeather.weather, songArray => {
                arrayofSongArrays[index] = songArray;
                counter++;
                return songArray;
              });
            });
          });
          var waitingForSongData = setInterval(function() {
            if (counter === placeArray.length) {
              var songUriArray = [].concat.apply([], arrayofSongArrays);
              // console.log('songUriArray: ', songUriArray);
              clearInterval(waitingForSongData);
              var headers = {
                'Content-Type': 'application/json',
              };
              API.getApi('/api/user', headers, function(err, data) {
                if (data.result !== 'error') {
                  // console.log(data.result);
                  var userId = data.result.username;
                  var accessToken = data.result.accessToken;
                  var playlistName = '' + new Date();
                  var isPlaylistPublic = false;
                  spotifyRequest.makeNewPlaylist(userId, accessToken, playlistName, isPlaylistPublic, function(error, results) {
                    if (error) {
                      console.error('could not make playlist');
                    } else {
                      var playlistId = results.id;
                      // console.log(playlistId);
                      spotifyRequest.addSongsToPlaylist(userId, accessToken, playlistId, songUriArray.slice(0, 100), function(error, results) {
                        if (error) {
                          console.error('could not add songs to playlist');
                        } else {
                          if (songUriArray.length > 100) {
                            spotifyRequest.addSongsToPlaylist(userId, accessToken, playlistId, songUriArray.slice(100, 200), function(error, results) {
                              if (error) {
                                console.error('could not add songs to playlist');
                              }
                            });
                          }
                          var deletePlaylistID = finalPlaylistID;
                          finalPlaylistID = playlistId;
                          context.setState({
                            playlistUri: 'https://embed.spotify.com/?uri=spotify:user:' + userId + ':playlist:' + playlistId
                          });
                          if (deletePlaylistID !== '') {
                            // console.log('deleting', deletePlaylistID);
                            spotifyRequest.deletePlaylist(userId, accessToken, deletePlaylistID, function(error, results) {
                              if (error) {
                                console.log(error);
                              } else {
                                // console.log('successfully deleted', deletePlaylistID);
                              }
                            });
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          }, 1000);
          clearInterval(waitingForMapData);
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
                  <input id="start" type="text" className="validate autocomplete"></input>
                  <label>Start or 'Use My Location'</label>
                </div>
                <div className="input-field col s5">
                  <input id="end" type="text" className="validate"></input>
                  <label>Destination</label>
                </div>
                <div className="input-field col s2">
                  <input className="save-trip-btn btn waves-effect waves-light" type="button" id="submit" onClick={this.generateNewPlaylist} value={this.state.playlistUri ? 'New Playlist' : 'Preview Trip'}></input>
                </div>
              </div>
              <div className="row">
              <p id="warningmessage">Please include both a start and destination.</p>
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
            <div className="playlist">
              <iframe src={this.state.playlistUri} width="400" height="380" frameBorder="0" allowTransparency="true"></iframe>
            </div>
          </div>
        </div>
      </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('App'));