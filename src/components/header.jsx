var React = require('react');
var ReactDOM = require('react-dom');

//Mixins
var API = require('../mixins/APImixin');

var header = React.createClass({
  mixins: [API],
  componentDidMount: function() {
    var context = this;
    var headers = {
      'Content-Type': 'application/json',
    };
    API.getApi('/api/user', headers, function(err, data) {
      if (data.result !== 'error') {
        //username
        var username = data.result.displayName === null ? data.result.username : data.result.displayName;

        $('.displayInfo').html('<a class="logout-btn" href="/logout">Logout</a>' +
                               '<div class="username">' + username + '</div>');

        if (data.result.displayName !== null) {
          $('.displayInfo').append('<img class="profilepic header-content" src="' + data.result.photos[0] + '"></img>');
        }

      } else {
        $('.menu-btn').hide();
      }
    });

    $('.button-collapse').sideNav();
  },
  render() {
    return (
      <div className="header-content">
        <a href="#" data-activates="nav-mobile" className="menu-btn button-collapse top-nav full hide-on-large-only">
          <img className="burger-icon" src="./img/burgerIcon.png"></img>
        </a>
        <div className="displayInfo">
        </div>
      </div>
    );
  }
});

module.exports = header;