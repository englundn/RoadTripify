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
        $('.displayInfo').html('<a class="logout-btn" href="/logout">Logout</a>' +
                               '<div class="username">' + data.result.username + '</div>');

      } else {
        $('.menu-btn').hide();
      }
    })

		$(".button-collapse").sideNav();
	},
  render() {
    return (
      <div className="header-content">
      	<a href="#" data-activates="nav-mobile" className="menu-btn button-collapse top-nav full hide-on-large-only">
      		<i className="material-icons">menu</i>
      	</a>
        <div className="displayInfo">
        </div>
      </div>
    )
  }
})

module.exports = header;