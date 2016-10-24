var React = require('react');
var ReactDOM = require('react-dom');

var header = React.createClass({
	componentDidMount: function() {
		$(".button-collapse").sideNav();
	},
  render() {
    return (
      <div className="header-content">
      	<a href="#" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only">
      		<i className="material-icons">menu</i>
      	</a>
      </div>
    )
  }
})

module.exports = header;