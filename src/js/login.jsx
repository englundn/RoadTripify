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
      <div>Login page</div>
      <a href="/auth/spotify">Login with Spotify</a>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('App'));