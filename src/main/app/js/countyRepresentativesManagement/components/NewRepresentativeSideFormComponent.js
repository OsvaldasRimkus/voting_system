/**
 * Created by osvaldas on 17.2.7.
 */
var React = require('react');
var ValidationsOR = require("../../utils/ValidationsOR");
var Validations = require("../../utils/Validations");

var onlyRequiredCounties = [];

var NewRepresentativeSideFormComponent = React.createClass({

    getInitialState: function () {
        return {
            countiesOfDistrict: [],
            name: '',
            surname: '',
            email: '',
            district: 'Pasirinkite apygardą',
            county: 'Pasirinkite apylinkę',

            nameErrors: [],
            surnameErrors: [],
            emailErrors: [],
        }
    },

    componentWillMount: function () {
        onlyRequiredCounties = [];
    },
    handleNameChange: function (event) {
        this.setState({
            name: event.target.value,
            nameErrors: ValidationsOR.nameValidation(event.target.value.trim())
        });
    },
    handleSurnameChange: function (event) {
        this.setState({
            surname: event.target.value,
            surnameErrors: ValidationsOR.nameValidation(event.target.value.trim())
        });
    },
    hendleEmailChange: function (event) {
        this.setState({
            email: event.target.value,
            emailErrors: ValidationsOR.emailValidation(event.target.value.trim(), this.props.CountyRepresentativesEmailsArray)
        });
    },
    handleDistrictChange: function (event) {
        this.setState({district: event.target.value})
    },
    handleCountyChange: function (event) {
        this.setState({county: event.target.value});
    },
    callHelperFunction: function (event) {
        this.changePossibleCounties(event);
        this.handleDistrictChange(event);
    },

    changePossibleCounties: function (event) {
        onlyRequiredCounties = [];
        var self = this;
        var matchFound = false;
        var districtToLookFor = event.target.value;
        var currentDistrictObject = null;
        var currentDistrictName = '';
        var currentCountyName = '';
        var uniqueCombinationOfDistrictAndCounty = '';
        this.props.OnlyDistricts.map(function(district, index){
            currentDistrictObject = district;
            currentDistrictName = district.name;
            if(district.name == districtToLookFor){
                matchFound = true;
                onlyRequiredCounties = [];
                district.counties.map(function (county, index) {
                    currentCountyName = county.name;
                    uniqueCombinationOfDistrictAndCounty = currentDistrictName.concat(currentCountyName);
                    if(!self.props.uniqueDistrictAndCountyNameCombinationArray.includes(uniqueCombinationOfDistrictAndCounty)){
                        onlyRequiredCounties.push(county);
                    }
                });
                self.setState({countiesOfDistrict: onlyRequiredCounties})
            }
            if(matchFound == false){
                onlyRequiredCounties = [];
                self.setState({countiesOfDistrict: onlyRequiredCounties})
            }
        });
    },

    onSubmit: function (event) {
        var tempName = this.state.name.trim()[0].toUpperCase() + this.state.name.trim().substring(1).toLowerCase();
        var tempSurname = this.state.surname.trim()[0].toUpperCase() + this.state.surname.trim().substring(1).toLowerCase();
        tempSurname[0].toUpperCase();
        var tempEmail = this.state.email.toLowerCase();
        this.props.newRep(tempName, tempSurname, tempEmail, this.state.district, this.state.county);
        this.setState({name: ''});
        this.setState({surname: ''});
        this.setState({email: ''});
        this.setState({district: 'Pasirinkite apygardą'});
        this.setState({county: 'Pasirinkite apylinkę'});
        this.changePossibleCounties(event);
    },

    springErrors: function() {
        return Validations.prepareSpringErrors(this.props.springErrors, {marginTop: 10});
    },

    render: function () {

        {this.changePossibleCounties}

        var DistrictNames = [];
        DistrictNames = this.props.OnlyDistricts;

        MakeDistrictItem = function(X) {
            return <option key={X.id}>{X.name}</option>;
        };
        MakeCountyItem = function(X) {
            return <option key={X.id}>{X.name}</option>;
        };

        var springErrors = (this.props.springErrors.length > 0) ? this.springErrors() : [];

        return (
            <form>
                <div className="form-group">
                    <label htmlFor="inputCounty">Atstovo vardas</label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
                    {this.state.nameErrors}
                    <label htmlFor="inputCounty">Atstovo pavardė</label>
                    <input type="text" className="form-control" value={this.state.surname} onChange={this.handleSurnameChange}/>
                    {this.state.surnameErrors}
                    <label htmlFor="inputCounty">Atstovo el. paštas</label>
                    <input type="text" className="form-control"  value={this.state.email} onChange={this.hendleEmailChange}/>
                    {this.state.emailErrors}
                    <label htmlFor="inputCounty" >Atstovo apygarda</label>
                    <select className="form-control" value={this.state.district} onChange={this.callHelperFunction}>
                        <option>Pasirinkite apygardą</option>;
                        {DistrictNames.map(MakeDistrictItem)}
                    </select>
                    <label htmlFor="inputCounty">Atstovo apylinkė</label>
                    <select className="form-control" value={this.state.county} onChange={this.handleCountyChange}>
                        <option>Pasirinkite apylinkę</option>;
                        {onlyRequiredCounties.map(MakeCountyItem)}
                    </select>
                </div>
                <div>
                    <button type="submit" disabled={
                        this.state.nameErrors.length > 0 ||
                        this.state.surnameErrors.length > 0 ||
                        this.state.emailErrors.length > 0 ||
                        this.state.district == 'Pasirinkite apygardą' ||
                        this.state.county == 'Pasirinkite apylinkę' ||
                        this.state.name == '' ||
                        this.state.surname == '' ||
                        this.state.email == ''
                    } className="btn btn-primary btn-md" onClick={this.onSubmit} style={{ marginTop: 10 }} >Sukurti</button>
                </div>
                {springErrors}

            </form>
        )
    }

});

module.exports = NewRepresentativeSideFormComponent;
