var React = require('react');
var axios = require('axios');
var DistrictDisplayComponent = require('../components/DistrictDisplayComponent');
var CountyDisplayComponent = require('../components/CountyDisplayComponent');
var NewCountyInlineForm = require('../components/tiny_components/NewCountyInlineForm');
var NewCountyFormButton = require('../components/tiny_components/NewCountyFormButton');
var spring = require('../../config/SpringConfig');

var DistrictDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({ showCounties: false,
                  showInlineForm: false,
                  countyName: "",
                  countyAddress: "",
                  voterCount: undefined,
                  counties: this.props.district.counties,
                  springErrors: [] });
    },
    toggleCountiesList: function() {
        this.setState({ showCounties: !this.state.showCounties });
    },
    prepareCounties: function() {
        var stateCounties = this.state.counties;
        var counties = [];

        stateCounties.forEach((c, index) => {
            counties.push(
                <CountyDisplayComponent
                    key={index}
                    index={index}
                    county={c}
                    delete={this.handleCountyDelete}
                />
            );
        });
        counties.push(
            <div className="list-group-item" key={stateCounties.length}>
                {this.toggleInlineForm()}
            </div>
        );
        return counties;
    },
    toggleShowInlineState: function() {
        this.setState({
            showInlineForm: !this.state.showInlineForm,
            countyName: "",
            voterCount: undefined,
            countyAddress: ""
        });
    },
    handleCountyCreate() {
        var _this = this;
        var errors = [];
        var body = {
            name: this.state.countyName,
            voterCount: this.state.voterCount,
            address: this.state.countyAddress
        };
        var postUrl = spring.localHost.concat('/api/district/') + this.props.district.id + '/add-county'
        axios.post(postUrl, body)
            .then(function(resp) {
                var counties = _this.state.counties;
                counties.push(resp.data);

                _this.setState({
                    showInlineForm: false,
                    countyName: "",
                    voterCount: undefined,
                    countyAddress: "",
                    countyBackendErrors: [],
                    springErrors: [],
                    counties: resp.data.counties
                });
            })
            .catch(function(err) {
                console.log(err);
                errors.push(err.response.data.rootMessage);
                _this.setState({ springErrors: errors.concat(err.response.data.errorsMessages) });
            });
    },
    handleCountyDelete: function(index) {
        var _this = this;
        var counties = this.state.counties;

        axios.delete(spring.localHost.concat('/api/district/county/') + counties[index].id)
		    .then(function(resp) {
		        counties.splice(index, 1);
		        _this.setState({ counties: counties });
		    })
		    .catch(function(err) {
		        console.log(err);
		    })
    },
    handleCountyCancel: function() {
        this.setState({ showInlineForm: !this.state.showInlineForm });
    },
    handleNameChange: function(e) {
        this.setState({ countyName: e.target.value })
    },
    handleVoterCount: function(e) {
        this.setState({ voterCount: e.target.value })
    },
    handleAddressChange: function(value) {
        this.setState({ countyAddress: value});
    },
    setSuggest: function(suggest) {
        this.setState({ countyAddress: suggest.label });
    },
    handleDistrictDestroy() {
        var _this = this;
        var deletePath = spring.localHost.concat("/api/district/") + this.props.district.id + "";
        axios.delete(deletePath)
            .then(function(resp) {
                _this.setState({ showCounties: false });
                _this.props.remove(_this.props.index);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    toggleInlineForm() {
        if (this.state.showInlineForm) {
            return <NewCountyInlineForm
                      cancel={this.handleCountyCancel}
                      submit={this.handleCountyCreate}
                      changeName={this.handleNameChange}
                      changeVoterCount={this.handleVoterCount}
                      changeAddress={this.handleAddressChange}
                      setSuggest={this.setSuggest}
                      name={this.state.countyName}
                      count={this.state.voterCount}
                      address={this.state.countyAddress}
                      springErrors={this.state.springErrors}
                   />
        } else {
            return <NewCountyFormButton
                renderCountyForm={this.toggleShowInlineState}
            />
        }
    },
    render: function() {
        var counties = (this.state.showCounties) ? this.prepareCounties() : [];
        return <DistrictDisplayComponent
                    name={this.props.district.name}
                    counties={counties}
                    toggleCountiesList={this.toggleCountiesList}
                    show={this.state.showCounties}
                    delete={this.handleDistrictDestroy}
               />
    }
});

module.exports = DistrictDisplayContainer;
