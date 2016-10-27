var React = require('react');
var ReactDOM = require('react-dom');

var header = React.createClass({
  render() {
    return (
      <div id="nav-mobile" className="side-nav fixed">
      	<ul>
          <li><a className="nav-items" href="/search.html">Search</a></li>
          <li><a className="nav-items" href="/history.html">History</a></li>
      	</ul>
      </div>
    )
  }
})

module.exports = header;