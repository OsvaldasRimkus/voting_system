var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var styles = {
	"active": {backgroundColor: '#006B96', color:"white"},
	"passive": {backgroundColor: '#CDEBF7', color:"#006B96"},
	"image": {width: 60, height: 60, marginBottom: 10}
}

var RepresentativesPanelComponent = React.createClass({
	getInitialState: function () {
		return ({
			tagIds: {
				location1: styles.passive,
				location2: styles.passive,
				location3: styles.passive,
			}
		});
   },
	resetButtonBackgrounds: function() {
	 this.setState({
			tagIds: {
				location1: styles.passive,
				location2: styles.passive,
				location3: styles.passive,
			}
		});
   },
	setBackgrounds: function(tag) {
		var stateObj = this.state;
		var newState = {};

		Object.keys(stateObj.tagIds).forEach(key => {
			var value = (key === tag.id) ? styles.active : styles.passive;
			newState[key] = value;
		});
		this.setState({ tagIds: newState });
	},
   componentWillReceiveProps: function(nextProps) {
		// if (nextProps.location.pathname === '/atstovui') {
		// 	this.resetButtonBackgrounds();
		// }
		// if (nextProps.location.pathname === '/atstovui/rezultatai/vienmandaciai') {
		// 	this.setBackgrounds(location1);
		// }
		// if (nextProps.location.pathname === '/atstovui/rezultatai/daugiamandaciai') {
		// 	this.setBackgrounds(location2);
		// }
   },
   render: function() {
	  return (
			<div className="menu">
				<ul className="nav nav-tabs" id="bootstrap-overrides-nav-tabs">
					<li className="tab centered">
						<Link
							to="atstovui/rezultatai/vienmandaciai"
							className="adminPanelButton"
							id="location1"
							style={this.state.tagIds.location1}>
							<img src="app/imgs/results_chart.png" style={ styles.image }/>
							<p>Apylinkės rezultatai (VIENMANDAČIAI)</p>
						</Link>
					</li>
					<li className="tab centered">
						<Link
							to="atstovui/rezultatai/daugiamandaciai"
							className="adminPanelButton"
							id="location2"
							style={this.state.tagIds.location2}>
							<img src="app/imgs/results_chart.png" style={ styles.image }/>
							<p>Apylinkės rezultatai (DAUGIMANDAČIAI)</p>
						</Link>
					</li>
					<li className="tab centered">
						<Link
							to="atstovui/profilis"
							className="adminPanelButton"
							id="location3"
							style={this.state.tagIds.location5}>
							<img src="app/imgs/user.png" style={ styles.image }/>
							<p style={{ marginBottom: 0 }}>Atstovo</p>
							<p>profilis</p>
						</Link>
					</li>
				</ul>
			</div>
	 );
   }
});

module.exports = RepresentativesPanelComponent;
