/**
 * Created by osvaldas on 17.2.7.
 */
var React = require('react');
var NewRepresentativeSideFormContainer = require('../containers/NewRepresentativeSideFormContainer');
var CountyRepresentativeListLineComponent = require('./CountyRepresentativeListLineComponent');

var CountyRepresentativesDisplayComponent = React.createClass ({
    render: function () {
        var CountyRepresentativesArray = [];
        var ArrayOfUniqueCombinationsOfDistrictAndCountyNames = [];
        var CountyRepresentativesEmailsArray = [];

        var _this = this;

        this.props.repData.forEach(function (rep, index) {
            CountyRepresentativesArray.push(
                <CountyRepresentativeListLineComponent
                    repData={rep}
                    index={index}
                    id={rep.id}
                    key={index}
                    onDeleteRepresentative={_this.props.onDeleteRepresentative}
                />
            );
            CountyRepresentativesEmailsArray.push(rep.email);
            var RepresentativeIsFromDistrict = rep.districtName;
            var RepresentativeIsFromCounty = rep.countyName;
            var UniqueCombinaitonOfDistrictAndCounty = RepresentativeIsFromDistrict.concat(RepresentativeIsFromCounty);
            ArrayOfUniqueCombinationsOfDistrictAndCountyNames.push(UniqueCombinaitonOfDistrictAndCounty);
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 units-list-area">
                        <div className="list-group-item active">
                            <div style={{textAlign:"center"}}><b>RINKIMŲ APYLINKIŲ ATSTOVAI</b></div>
                        </div>
                        <div className="list-group-item active">
                            <div>
                                <div style={{height: "20px"}}>
                                    <div className="col-md-4">Atstovas</div>
                                    <div className="col-md-4">Apylinkė</div>
                                    <div className="col-md-3">Atstovo el. paštas</div>
                                    <div className="col-md-1">Trinti</div>
                                </div>
                            </div>
                        </div>
                        {CountyRepresentativesArray}
                    </div>
                    <div className="col-md-4 units-create-area">
                        <div className="col-md-11">
                            <NewRepresentativeSideFormContainer
                                newRep={this.props.newRep}
                                districtsData={this.props.districtsData}
                                CountyRepresentativesEmailsArray={CountyRepresentativesEmailsArray}
                                uniqueDistrictAndCountyNameCombinationArray={ArrayOfUniqueCombinationsOfDistrictAndCountyNames}
                                springErrors={this.props.springErrors}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = CountyRepresentativesDisplayComponent;
