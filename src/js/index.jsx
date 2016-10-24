var React = require('react');
var ReactDOM = require('react-dom');

//Components
var Header = require('../components/header');
var SideMenu = require('../components/sideMenu');

//Mixins
var API = require('../mixins/APImixin');

var App = React.createClass({
  mixins: [API],

  render() {
    return (
      <div>
      <header>
      	<Header />
      </header>
      <SideMenu />
      <main>
      	<div className="row">
					<div className="col s12 m9 l10">Index page</div>
          <iframe src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
				</div>
      </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('App'));