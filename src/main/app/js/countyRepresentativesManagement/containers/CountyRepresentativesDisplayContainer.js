/**
 * Created by osvaldas on 17.2.7.
 */
var React = require ('react');
var axios = require ('axios');
var CountyRepresentativesDisplayComponent = require('../components/CountyRepresentativesDisplayComponent');
var spring = require('../../config/SpringConfig');

var CountyRepresentativesDisplayContainer = React.createClass({

    getInitialState: function () {
        return ({
            representatives: [],
            districts: [],
            newRepresentative: {
                firstName: "vardas",
                lastName: "pavarde",
                county: { id: 0 }
            },
            springErrors: []
        });
    },

    componentDidMount: function () {
        var self = this;
        axios
            .all([
                axios.get(spring.localHost.concat('/api/county-rep')),
                axios.get(spring.localHost.concat('/api/district'))
            ])
            .then(axios.spread(function(countyReps, districts) {
                self.setState({
                    representatives: countyReps.data,
                    districts: districts.data
                });
            }))
            .catch(function(error){
                console.log(error);
            })
    },

    handleDeleteRepresentative: function (repId, index) {
        var self = this;
        var deleteUrl = spring.localHost.concat('/api/county-rep/') + repId;
        axios.delete(deleteUrl)
            .then(function(response){
                var representatives = self.state.representatives;
                representatives.splice(index, 1);
                self.setState({representatives: representatives});
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    newRep: function (name, surname, email, district, county) {
        //e.preventDefault();
        var self = this;
        var errors = [];
        var countyId = this.getCountyId(district, county);

        var RequestBody = {"firstName": name, "lastName": surname, "email": email, "countyId": countyId};

        axios.post(spring.localHost.concat('/api/county-rep'), RequestBody)
            .then(function(response){
                var actualRepresentatives = self.state.representatives;
                actualRepresentatives.push(response.data);
                self.setState({ representatives: actualRepresentatives, newRepresentative: response.data });
            })
            .catch(function(error){
                console.log(error);
                errors.push(error.response.data.rootMessage);
                self.setState({ springErrors: errors.concat(error.response.data.errorsMessages) });
            });
    },

    getCountyId: function (districtName, countyName) {
        var CountyId;
        this.state.districts.map(function(district, index){
            if(district.name == districtName){
                district.counties.map(function (county, index) {
                    if(county.name == countyName) CountyId = county.id;
                });
            }
        });
        return CountyId;
    },

    render: function () {
        return (
            <div>
                <CountyRepresentativesDisplayComponent
                    repData={this.state.representatives}
                    onDeleteRepresentative={this.handleDeleteRepresentative}
                    newRep={this.newRep}
                    districtsData={this.state.districts}
                    springErrors={this.state.springErrors}
                />
            </div>
        )
    }
});

module.exports = CountyRepresentativesDisplayContainer;
