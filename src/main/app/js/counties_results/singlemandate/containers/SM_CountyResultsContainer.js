var React = require('react');
var axios = require('axios');
var SM_CountyResultsComponent = require('../components/SM_CountyResultsComponent');
var SM_CountyResultsDisplayComponent = require('../components/SM_CountyResultsDisplayComponent');
var CandidateDisplayComponent = require('../../shared/CandidateDisplayComponent');
var CandidateWithResultsDisplayComponent = require('../../multimandate/components/CandidateWithResultsDisplayComponent');
var Validations = require('../../../utils/Validations');
var Helpers = require('../../../utils/Helpers');

var SM_CountyResultsContainer = React.createClass({
    getInitialState: function() {
        return ({ candidates: [],
                  activeCountyId: undefined,
                  representative: [],
                  dictionary: new Map(),
                  spoiled: "",
                  springErrors: [],
                  SMresults: {}
                });
    },
    componentDidMount: function() {

        // refactor when login will be implemented

        var _this = this;
        var getUrl = "http://localhost:8080/api/county-rep/" + this.props.params.id + "";
        axios.get(getUrl)
            .then(function(resp) {
                var results = _this.getSMresults(resp.data.county);
                _this.setState({ representative: resp.data,
                                 activeCountyId: resp.data.county.id,
                                 SMresults: results });
                _this.getCandidates();
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    getSMresults: function(county) {
        var results = {};
        county.countyResults.forEach(sm => {
            if (sm.singleMandateSystem) results = sm;
        });
        return results;
    },
    getCandidates: function() {
        var _this = this;
        var getUrl = "http://localhost:8080/api/county/" + this.state.activeCountyId + "/candidates";
        axios.get(getUrl)
            .then(function(resp) {
              var initialDictionary = _this.formInitialDictionary(resp.data);
                _this.setState({ candidates: resp.data,
                                 dictionary: initialDictionary });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    prepareCandidates() {
        var preparedCandidates = [];
        var candidates = this.state.candidates;
        var stateDictionary = this.state.dictionary;

        candidates.forEach((c, idx) => {
            preparedCandidates.push(
                <CandidateDisplayComponent
                    key={idx}
                    candidate={c}
                    changeVotes={this.handleChangeVotes}
                    votes={stateDictionary.get(c.id)}
                />
            );
        });

        return preparedCandidates;
    },
    prepareCandidatesWithResults: function() {
        var preparedCandidates = [];
        var candidates = this.state.candidates;
        var candidatesVotesList = this.state.SMresults.unitVotesList;
        var cVotes = {};

        candidates.forEach((c, idx) => {
            candidatesVotesList.forEach(cv => {
                if (cv.candidate.id === c.id) cVotes = cv;
            });
            preparedCandidates.push(
                <CandidateWithResultsDisplayComponent
                    key={idx}
                    candidate={c}
                    cVotes={cVotes}
                />
            );
        });

        return preparedCandidates;
    },
    formInitialDictionary: function(candidates) {
        var mapped = new Map();
        candidates.forEach(c => mapped.set(c.id, ""));
        return mapped;
    },
    clearForm: function() {
        var newDictionary = new Map();
        var tempDictionary = this.state.dictionary;
        tempDictionary.forEach(function(value, key) {
            newDictionary.set(key, "");
        });
        this.setState({ dictionary: newDictionary,
                        springErrors: [],
                        spoiled: "" });
    },
    prepareRepresentative() {
        return (
            <div>
                <div className="list-group-item active">
                    Prisijungęs kaip
                </div>
                <div className="list-group-item">
                    <img src="app/imgs/representative.png" style={{ width: 20, height: 20 }}/> &nbsp;
                    <span>{this.state.representative.firstName}</span> &nbsp;
                    <span>{this.state.representative.lastName}</span>
                </div>
            </div>
        );
    },
    handleChangeSpoiled: function(e) {
        this.setState({ spoiled: e.target.value })
    },
    handleChangeVotes: function(candidate_id, votes) {
        var actualDict = this.state.dictionary;
        actualDict.set(candidate_id, votes);
        this.setState({ dictionary: actualDict });
    },
    handleSubmitSMresults: function() {
        var _this = this;
        var map = this.state.dictionary;
        var candidatesVotes = [];
        for (var pair of map) {
            candidatesVotes.push({ "unitId": pair[0], "votes": pair[1] });
        }
        var body = {
            "spoiledBallots": this.state.spoiled,
            "countyId": this.state.activeCountyId,
            "singleMandateSystem": true,
            "unitVotes": candidatesVotes
        }
        axios.post('http://localhost:8080/api/county-results/',
                    body,
                    { headers: { 'Content-Type': 'application/json' } }
              )
              .then(function(resp) {
                  _this.setState({ springErrors: [],
                                   dictionary: new Map(),
                                   spoiled: undefined,
                                   SMresults: resp.data });
              })
              .catch(function(err) {
                  console.log(err);
                  _this.setState({ springErrors: err.response.data.errorsMessages });
              });
    },
    prepareSpringErrors: function() {
        var style={"marginTop": 10}
        return Validations.prepareSpringErrors(this.state.springErrors, style);
    },
    render: function() {
        var formOrResults;
        if (Object.keys(this.state.SMresults).length > 0) {
            formOrResults = <SM_CountyResultsDisplayComponent
                                representative={this.prepareRepresentative()}
                                spoiled={this.state.SMresults.spoiledBallots}
                                candidates={this.prepareCandidatesWithResults()}
                                createdOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.SMresults.createdOn,
                                              "Rezultatai pateikti"
                                          )}
                                confirmedOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.SMresults.confirmedOn,
                                              "Rezultatai patvirtinti"
                                          )}
                            />
        } else {
            formOrResults = <SM_CountyResultsComponent
                                representative={this.prepareRepresentative()}
                                candidates={this.prepareCandidates()}
                                spoiled={this.state.spoiled}
                                dictionary={this.state.dictionary}
                                changeSpoiled={this.handleChangeSpoiled}
                                submitSMresults={this.handleSubmitSMresults}
                                springErrors={this.prepareSpringErrors()}
                                activeCountyId={this.state.activeCountyId}
                                clearForm={this.clearForm}
                             />
        }
        return formOrResults;
    }
});

module.exports = SM_CountyResultsContainer;
