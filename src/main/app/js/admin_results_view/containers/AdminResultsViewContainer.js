var React = require('react');
var axios = require('axios');
var AdminResultsViewComponent = require('../components/AdminResultsViewComponent');
var CountyDisplayContainer = require('./CountyDisplayContainer');
var spring = require('../../config/SpringConfig');

var AdminResultsViewContainer = React.createClass({
	getInitialState: function() {
		return ({ districts: [],
				  counties: [],
				  activeDistrictId: 0,
				  activeCountyId: 0 });
	},
	componentDidMount: function() {
		var _this = this;

		axios.get(spring.localHost.concat('/api/district'))
			.then(function(response) {
				var counties = [];
				response.data.forEach(d => {
					d.counties.forEach(c => counties.push(c));
				});
				_this.setState({ districts: response.data,
								 counties: counties });
			})
			.catch(function(err) {
				console.log(err);
			})

	},
	setActiveDistrict: function(e) {
		this.setState({ activeDistrictId: e.target.value });
	},
	setActiveCounty: function(e) {
		this.setState({ activeCountyId: e.target.value });
	},
	prepareCounties() {
		var counties = this.state.counties;
		var preparedCounties = [];

		if (this.state.activeDistrictId != 0) {
			if (this.state.activeCountyId != 0) {
				counties.forEach((c, idx) => {
					if (this.state.activeCountyId == c.id) {
						preparedCounties.push(
							<CountyDisplayContainer
								key={idx}
								index={idx}
								county={c}
							/>
						);
					}
				});
			} else {
				counties.forEach((c, idx) => {
					if (this.state.activeDistrictId == c.districtId) {
						preparedCounties.push(
							<CountyDisplayContainer
								key={idx}
								index={idx}
								county={c}
							/>
						);
					}
				});
			}
		} else {
			counties.forEach((c, idx) => {
				preparedCounties.push(
					<CountyDisplayContainer
						key={idx}
						index={idx}
						county={c}
					/>
				);
			});
		}
		return preparedCounties;
	},
	districtsSelect: function() {
		var districts = this.state.districts;
		var preparedDistricts = [];

		districts.forEach((d, idx) => {
			preparedDistricts.push(
				<option
					value={d.id}
					key={idx}
				>
					{d.name}
				</option>
			);
		});

		return (
			<select value={this.state.activeDistrictId} onChange={this.setActiveDistrict}>
				<option
					value={0}
					key={districts.length}
				>
					Visos apygardos
				</option>
				{preparedDistricts}
			</select>
		);
	},
	countiesSelect: function() {
		var counties = this.state.counties;
		var filteredCounties = [];

		if (this.state.activeDistrictId == 0) return undefined;


		else {
			counties.forEach((c, idx) => {
				if (c.districtId == this.state.activeDistrictId) {
					filteredCounties.push(
						<option
							value={c.id}
							key={idx}
						>
							{c.name}
						</option>
					);
				}
			});
		}

		return (
			<select value={this.state.activeCountyId} onChange={this.setActiveCounty}>
				<option
					value={0}
					key={counties.length}
				>
					Visos apylinkės
				</option>
				{filteredCounties}
			</select>
		);
	},
	render: function() {
		return <AdminResultsViewComponent
				  counties={this.prepareCounties()}
				  districtsSelect ={this.districtsSelect()}
				  countiesSelect={this.countiesSelect()}
			   />
	}
});

module.exports = AdminResultsViewContainer;
