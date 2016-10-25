var React = require('react');
var ReactDOM = require('react-dom');

var header = React.createClass({
  render() {
    return (
      <div id="nav-mobile" className="side-nav fixed">
      	<ul>
          <li><a className="nav-items" href="/search.html">Search</a></li>
          <li><a className="nav-items" href="/">History</a></li>
      		<li><a className="nav-items" href="/">Navigate</a></li>
      		<li><a className="nav-items settings" href="/">Settings</a></li>
      	</ul>
      </div>
    )
  }
})

module.exports = header;