var React = require('react');
var axios = require('axios');
var CountyResultsComponent = require('../components/CountyResultsComponent');
var ResultsDisplayComponent = require('../components/ResultsDisplayComponent');
var CandidateDisplayComponent = require('../components/CandidateDisplayComponent');
var MM_PartyComponent = require('../components/MM_PartyComponent')
var Validations = require('../../utils/Validations');
var Helpers = require('../../utils/Helpers');

var CountyResultsContainer = React.createClass({
    getInitialState: function() {
        return ({
            representative: undefined,
            results: undefined,
            votees: undefined,
            activeCountyId: undefined,
            dictionary: new Map(),
            spoiled: "",
            springErrors: []
        });
    },
    componentWillMount() {
        this.resultType = this.props.location.pathname.includes('vienmandaciai') ?
                            'single-mandate' :
                            'multi-mandate'
        this.resultPostUrl =  'http://localhost:8080/api/results/county/' + this.resultType
        this.header = this.resultType === 'single-mandate' ?
                        "Apylinkės kandidatų rezultatai (VIENMANDAČIAI)" :
                        "Partijų sąrašas (DAUGIAMANDAČIAI)"
    },
    componentDidMount: function() {

        // refactor when login will be implemented
        
    },
    componentWillReceiveProps(newProps) {
        if (newProps.countyId !== null) {
            this.getResultsOrVotees(newProps);
        }
    },
    getResultsOrVotees: function(props) {
        let _this = this
        let resultsUrl = "http://localhost:8080/api/results/county/" + props.countyId + "/" + this.resultType
        axios
            .get(resultsUrl)
            .then(function(response) {
                if (response.data) {
                    _this.setState({ results: response.data })
                } else {
                    let getUrl = _this.resultType === 'single-mandate' ?
                                    'http://localhost:8080/api/district/' + props.districtId + '/candidates' :
                                    'http://localhost:8080/api/party/'
                    _this.getVotees(getUrl)
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    getVotees(url) {
        let _this = this
        axios
            .get(url)
            .then(function(response) {
                _this.setState({ 
                    votees: response.data,
                    dictionary: _this.formDictionary(response.data)
                })
            })
            .catch(function(err) {
                console.log(err)
            })
    },
    prepareVotees() {
        let votees = this.resultType === 'single-mandate' ?
                     this.prepareCandidates() :
                     this.prepareParties();
        return votees
    },
    prepareCandidates() {
        let candidates = this.state.votees.map((votee, idx) => {
                            return <CandidateDisplayComponent
                                        key={idx}
                                        candidate={votee}
                                        changeVotes={this.handleChangeVotes}
                                        votes={this.state.dictionary.get(votee.id)}
                                    />
                        });
        return candidates
    },
    prepareParties() {
        let parties = this.state.votees.map((votee, idx) => {
                        return <MM_PartyComponent
                                    key={idx}
                                    party={votee}
                                    changeVotes={this.handleChangeVotes}
                                    votes={this.state.dictionary.get(votee.id)}
                                />
                    });
        return parties
    },
    formDictionary: function(votees) {
        var mapped = new Map();
        votees.forEach(v => mapped.set(v.id, ""));
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
    handleChangeSpoiled: function(e) {
        e.preventDefault()
        this.setState({ spoiled: e.target.value })
    },
    handleChangeVotes: function(votee_id, votes) {
        var actualDict = this.state.dictionary;
        actualDict.set(votee_id, votes);
        this.setState({ dictionary: actualDict });
    },
    handleSubmitResults: function() {
        var _this = this;
        var map = this.state.dictionary;
        var voteList = [];
        for (var pair of map) voteList.push({ "unitId": pair[0], "votes": pair[1] });
        var errors = [];
        var body = {
            "spoiledBallots": this.state.spoiled,
            "countyId": this.props.countyId,
            "unitVotes": voteList
        }
        axios.post(this.resultPostUrl, body)
            .then(function(resp) {
                _this.setState({ 
                    springErrors: [],
                    dictionary: new Map(),
                    spoiled: undefined,
                    results: resp.data 
                });
            })
            .catch(function(err) {
                console.log(err);
                errors.push(err.response.data.rootMessage);
                _this.setState({ springErrors: errors.concat(err.response.data.errorsMessages) });
            });
    },
    render: function() {
        var formOrResults;
        if (this.state.results) {
            formOrResults = <ResultsDisplayComponent
                                header={this.header}
                                representative={this.props.representative}
                                results={this.state.results}
                                createdOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.results.createdOn,
                                              "Rezultatai pateikti"
                                          )}
                                confirmedOn={Helpers.dateTimeFormatWithMessage(
                                              this.state.results.confirmedOn,
                                              "Rezultatai patvirtinti"
                                          )}
                            />
        } else if (this.state.votees) {
            formOrResults = <CountyResultsComponent
                                header={this.header}
                                representative={this.props.representative}
                                votees={this.prepareVotees()}
                                spoiled={this.state.spoiled}
                                dictionary={this.state.dictionary}
                                changeSpoiled={this.handleChangeSpoiled}
                                submitResults={this.handleSubmitResults}
                                springErrors={this.state.springErrors}
                                activeCountyId={this.props.countyId}
                                clearForm={this.clearForm}
                            />
        } else {
            return <div></div>
        }
        return formOrResults;
    }
});

module.exports = CountyResultsContainer;
