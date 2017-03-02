var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var styles = {
		"active": {backgroundColor: '#006B96', color:"white"},
		"passive": {backgroundColor: '#CDEBF7', color:"#006B96"},
		"image": {width: 60, height: 60, marginBottom: 10}
}

var AdminPanelComponent = React.createClass({
		getInitialState: function () {
				return ({ tagIds: this.setBackgroundsByLocation() });
	  },
		resetButtonBackgrounds: function() {
	      this.setState({
						tagIds: {
								location1: styles.passive,
								location2: styles.passive,
								location3: styles.passive,
								location4: styles.passive,
								location5: styles.passive
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
		    if (nextProps.location.pathname === '/administravimas') {
						this.resetButtonBackgrounds();
		    }
				if (nextProps.location.pathname === '/administravimas/teritorinis-suskirstymas') {
						this.setBackgrounds(location1);
		    }
		    if (nextProps.location.pathname === '/administravimas/apygardu-kandidatai') {
						this.setBackgrounds(location2);
				}
				if (nextProps.location.pathname === '/administravimas/apylinkiu-atstovai') {
						this.setBackgrounds(location3);
				}
		    if (nextProps.location.pathname === '/administravimas/politinis-suskirstymas') {
						this.setBackgrounds(location4);
		    }
		    if (nextProps.location.pathname === '/administravimas/apylinkiu-rezultatai') {
						this.setBackgrounds(location5);
		    }
	  },
		setBackgroundsByLocation: function() {
				var tagIds = {
						location1: styles.passive,
						location2: styles.passive,
						location3: styles.passive,
						location4: styles.passive,
						location5: styles.passive
				}

				switch (this.props.location.pathname) {
					case '/administravimas/teritorinis-suskirstymas':
						tagIds.location1 = styles.active;
						break;
					case '/administravimas/apygardu-kandidatai':
						tagIds.location2 = styles.active;
						break;
					case '/administravimas/apylinkiu-atstovai':
						tagIds.location3 = styles.active;
						break;
					case '/administravimas/politinis-suskirstymas':
						tagIds.location4 = styles.active;
						break;
					case '/administravimas/apylinkiu-rezultatai':
						tagIds.location5 = styles.active;
				}

				return tagIds;

		},
	  render: function() {
	  		return (
						<div>
								<div className="menu">
										<ul className="nav nav-tabs" id="bootstrap-overrides-nav-tabs">
												<li className="tab">
														<Link
																to="administravimas/teritorinis-suskirstymas"
																className="adminPanelButton"
																id="location1"
																style={this.state.tagIds.location1}>
																<img src="app/imgs/planet-earth.png" style={ styles.image }/>
																<p>Teritoriniai vienetai</p>
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/apygardu-kandidatai"
																className="adminPanelButton"
																id="location2"
																style={this.state.tagIds.location2}>
																<img src="app/imgs/SM_candidate.png" style={ styles.image }/>
																<p>Apygardų kandidatai</p>
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/apylinkiu-atstovai"
																className="adminPanelButton"
																id="location3"
																style={this.state.tagIds.location3}>
																<img src="app/imgs/representative1.png" style={ styles.image }/>
																<p>Apylinkių atstovai</p>
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/politinis-suskirstymas"
																className="adminPanelButton"
																id="location4"
																style={this.state.tagIds.location4}>
																<img src="app/imgs/political_party.png" style={ styles.image }/>
																<p>Politiniai vienetai</p>
														</Link>
												</li>
												<li className="tab">
														<Link
																to="administravimas/apylinkiu-rezultatai"
																className="adminPanelButton"
																id="location5"
																style={this.state.tagIds.location5}>
																<img src="app/imgs/results_chart.png" style={ styles.image }/>
																<p>Apylinkių rezultatai</p>
														</Link>
												</li>
										</ul>
								</div>
								<div className="main-layout">
				            {this.props.children}
								</div>
						</div>
	      );
	  }
});

module.exports = AdminPanelComponent;
