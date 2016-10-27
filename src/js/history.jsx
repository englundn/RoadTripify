var React = require('react');
var ReactDOM = require('react-dom');

//Components
var Header = require('../components/header');
var SideMenu = require('../components/sideMenu');

//Mixins
var API = require('../mixins/APImixin');

var App = React.createClass({
  mixins: [API],
  getInitialState: function() {
    return {
      trips: [] 
    };
  },
  componentDidMount() {
    var context = this;
    //this.geocodeLatLng(-122.4089664, 37.7836966);
    var headers = {
      'Content-Type': 'application/json'
    };
    API.getApi('/api/history', headers, function(err, data) {
      context.setState({trips:data.result});

      $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });  
    })
  },

  render: function() {
    var tripDataNode = this.state.trips.map(function(trip, index) {
      return (
        <li>
          <div className="collapsible-header row">
            <div className="title col s8">{trip.trip_name}</div>
            <div className="time col s4">{jQuery.timeago(trip.created_at)}</div>
            <div className="address-from col s12"><span className="sub-title">From:</span> {trip.start_address}</div>
            <div className="address-to col s12"><span className="sub-title">To:</span> {trip.end_address}</div>
          </div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
      );
    })

    return (
      <div>
      <header>
      	<Header />
      </header>
      <SideMenu />
      <main>
      	<div className="row">
          <div>History</div>
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