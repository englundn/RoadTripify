var React = require('react');
var ReactDOM = require('react-dom');

//Components
var Header = require('../components/header');
var SideMenu = require('../components/sideMenu');

//Mixins
var API = require('../mixins/APImixin');
var spotifyRequest = require('../mixins/spotifyRequest');

var App = React.createClass({
  mixins: [API],
  getInitialState: () => {
    return {
      trips: [],
      username: '' 
    };
  },
  componentDidMount() {
    this.runBeforeRendering();
  },

  runBeforeRendering() {
    var context = this;
    //this.geocodeLatLng(-122.4089664, 37.7836966);
    var headers = {
      'Content-Type': 'application/json'
    };
    API.getApi('/api/history', headers, function(err, data) {
      context.setState({trips: data.result});

      API.getApi('/api/user', headers, function(err, data) {
        context.setState({
          username: data.result.username,
          accessToken: data.result.accessToken
        });
        $('.collapsible').collapsible({
          accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });     
      });     

    });
  },
  deleteTrip: function(deletePlaylistId) {
    var context = this;
    // remove playlist from spotify
    var userId = context.state.username;
    var accessToken = context.state.accessToken;
    spotifyRequest.deletePlaylist(userId, accessToken, deletePlaylistId, function(error, results) {
      if (error) {
        console.log(error);
      } else {
        console.log('successfully deleted', deletePlaylistId);
      }
    });
    //remove trip from database
    var headers = {
      'Content-Type': 'application/json'
    };
    API.postApi('/api/deletesavedplaylists', headers, JSON.stringify({'playlist_uri': deletePlaylistId}), function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        context.runBeforeRendering();
      }
    });


  },

  render: function() {
    var context = this;
    var tripDataNode = this.state.trips.map(function(trip, index) {
      return (
        <li key={index}>
          <div className="collapsible-header row">
            <div className="title col s12">{trip.trip_name}</div>
            <div className="address-from col s8"><span className="sub-title">From:</span> {trip.start_address}</div>
            <div className="time col s4">{jQuery.timeago(trip.created_at)}</div>
            <div className="address-to col s12"><span className="sub-title">To:</span> {trip.end_address}</div>
          </div>
          <div className="collapsible-body">
            <iframe src={'https://embed.spotify.com/?uri=spotify:user:' + context.state.username + ':playlist:' + trip.playlist_uri} width="400" height="380" frameBorder="0" allowTransparency="true"></iframe>
            <span className="delete"><input className="btn waves-effect waves-light" type="button" onClick={() => context.deleteTrip(trip.playlist_uri)} value="Delete Playlist"></input></span>
          </div>
        </li>
      );
    });

    return (
      <div>
      <header>
        <Header />
      </header>
      <SideMenu />
      <main>
        <div className="row">
          <div className="page-title">My Trips</div>
          <ul className="collapsible" data-collapsible="accordion">
            {tripDataNode}
          </ul>
				</div>
      </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('App'));