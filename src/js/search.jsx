var React = require('react');
var ReactDOM = require('react-dom');

//Components
var Header = require('../components/header');
var SideMenu = require('../components/sideMenu');

//Mixins
var API = require('../mixins/APImixin');
var map = require('../mixins/initMap');

var saveRoute = function() {
  console.log('save route!!!!');
};

var App = React.createClass({
  mixins: [API, map],

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
                  <input id="end" type="tel" className="validate"></input>
                  <label>Destination</label>
                </div>
                <div className="input-field col s2">
                  <input className="btn waves-effect waves-light" type="button" id="submit" value="Submit"></input>
                </div>
                <div className="input-field col s1">
                  <input className="btn waves-effect waves-light" type="button" onClick={saveRoute} value="Save"></input>
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