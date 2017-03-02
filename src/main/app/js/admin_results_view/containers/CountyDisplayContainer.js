var React = require('react');
var axios = require('axios');
var CountyDisplayComponent = require('../components/CountyDisplayComponent');
var AdminViewCandidateComponent = require('../components/tiny_components/AdminViewCandidateComponent');
var ConfirmButton = require('../components/tiny_components/ConfirmButton');
var VoteListRow = require('../../counties_results/components/VoteListRow');
var spring = require('../../config/SpringConfig');

var CountyDisplayContainer = React.createClass({
    getInitialState: function() {
        return ({
            showResults: false,
            smDisplay: undefined,
            county: this.props.county,
            smResult: undefined,
            mmResult: undefined,
            actveResultId: undefined
        });
    },
    componentWillReceiveProps: function(newProps) {
        if (newProps.county != this.state.county) {
            this.setState({ county: newProps.county });
        }
    },
    componentDidMount: function() {
        var county = this.state.county;
        var _this = this
        axios
            .all([
                axios.get(spring.localHost.concat('/api/results/county/' + county.id + '/single-mandate')),
                axios.get(spring.localHost.concat('/api/results/county/' + county.id + '/multi-mandate')),
            ])
            .then(axios.spread(function(smResult, mmResult) {
                _this.setState({
                    smResult: smResult.data ? smResult.data : undefined,
                    mmResult: mmResult.data ? mmResult.data : undefined
                });
            }))
            .catch(function(err) {
                console.log(err);
            })
    },
    toggleShowResults: function() {
        this.setState({ showResults: !this.state.showResults });
    },
    displaySMresults: function() {
        activeResultId = this.state.smResult ? this.state.smResult.id : undefined
        this.setState({ 
            smDisplay: true, 
            activeResultId: activeResultId
         });
    },
    displayMMresults: function() {
        activeResultId = this.state.mmResult ? this.state.mmResult.id : undefined
        this.setState({ 
            smDisplay: false, 
            activeResultId: activeResultId
         });
    },
    prepareResults: function() {
        if (this.state.smDisplay == undefined) return undefined;
        var results = (this.state.smDisplay) ? this.state.smResult : this.state.mmResult
        if (results == undefined) return results;
        
        var preparedResults = [];

        preparedResults.push(
            <div className="list-group-item" key={results.votes.length}>
                <p>Sugadinti biuleteniai: {results.spoiledBallots}</p>
            </div>
        );
        results.votes.forEach((vote, idx) => {
            preparedResults.push(
                <VoteListRow
                    key={idx}
                    vote={vote}
                />
            );
        });
        return preparedResults;
    },
    determineConfirmButton: function() {
        var smDisplay = this.state.smDisplay;
        var activeResultId = this.state.activeResultId;

        if (smDisplay === undefined || activeResultId === undefined) {
            return undefined
        } 

        var result = smDisplay ? this.state.smResult : this.state.mmResult

        if (result.confirmed) {
            confirmBtn = 
                <ConfirmButton
                    text="Patvirtinta "
                    spanClass="glyphicon glyphicon-ok-sign"
                />
        } else {
            confirmBtn = 
                <ConfirmButton
                    onClick={this.confirmResults.bind(this, result.id)}
                    text="Patvirtinti rezultatus "
                    spanClass="glyphicon glyphicon-exclamation-sign"
                />
        }
        return confirmBtn;
    },
    determineDeleteButton: function() {
        if (this.state.activeResultId) {
            deleteBtn = <button 
                            className="btn btn-default btn-sm floaters-right" 
                            onClick={this.handleDelete.bind(this, this.state.activeResultId)}
                        >
                            Pašalinti 
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>    
        } else {
            deleteBtn = undefined
        }

        return deleteBtn;
    },
    confirmResults: function(resultId) {
        var resultType = this.state.smDisplay ? 'smResult' : 'mmResult';
        var result = (resultType === 'smResult') ? this.state.smResult : this.state.mmResult;

        var _this = this;
        var params = new URLSearchParams();
        params.append('resultId', resultId);

        axios.post(spring.localHost.concat('/api/results/confirm'), params)
            .then(function(resp) {
                result['confirmed'] = true
                _this.setState({ [resultType]: result });
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    handleDelete: function(resultId) {
        var resultType = this.state.smDisplay ? 'smResult' : 'mmResult';
        var _this = this;

        axios
            .delete(spring.localHost.concat('/api/results/' + resultId))
            .then(function(resp) {
                _this.setState({ 
                    [resultType] : undefined,
                    activeResultId: undefined
                 })
            })
            .catch(function(err) {
                console.log(err);
            })
    },
    determineAllConfirmedButton: function() {
        // var btn = (
        //     <span className="btn-sm confirmed-floaters">
        //         Patvirtinta &nbsp; <span className="glyphicon glyphicon-flag"></span>
        //     </span>
        // );
        // return (this.state.smResultsConfirmed && this.state.mmResultsConfirmed) ? btn : undefined;
        return undefined
    },
    render: function() {
        return (
            <CountyDisplayComponent
                index={this.props.index}
                show={this.state.showResults}
                toggleShow={this.toggleShowResults}
                county={this.state.county}
                displaySM={this.displaySMresults}
                displayMM={this.displayMMresults}
                results={this.prepareResults()}
                smDisplay={this.state.smDisplay}
                confirmBtn={this.determineConfirmButton()}
                deleteBtn={this.determineDeleteButton()}
                allConfirmedBtn={this.determineAllConfirmedButton()}
            />
        );
    }
});

module.exports = CountyDisplayContainer;
