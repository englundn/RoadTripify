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
			<div>Index page</div>

			</div>
		)
	}
})

ReactDOM.render(<App />, document.getElementById('App'))