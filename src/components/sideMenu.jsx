var React = require('react');
var ReactDOM = require('react-dom');

var header = React.createClass({
  render() {
    return (
      <div id="nav-mobile" className="side-nav fixed">
      	<ul>
      		<li className="nav-items">Search</li>
      		<li className="nav-items">History</li>
      		<li className="nav-items">Navigate</li>
      		<li className="nav-items settings">Settings</li>
      	</ul>
      </div>
    )
  }
})

module.exports = header;