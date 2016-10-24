var React = require('react');
var ReactDOM = require('react-dom');

//Components
var Header = require('../components/header');

//Mixins
var API = require('../mixins/APImixin');

var App = React.createClass({
  mixins: [API],

  render() {
    return (
      <div>
      <Header />
      <div className="content">
        <h2 className="title">Login</h2>
        <div className="login-spotify"><a className="waves-effect waves-light btn" href="/auth/spotify">Login with Spotify</a></div>
      </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('App'));