var React = require('react');
var styles = {"image": {width: 20, height: 20}}
var partyName;

var CandidateDisplayComponent = React.createClass({
    changeVotes: function(e) {
        this.props.changeVotes(this.props.candidate.id, e.target.value);
    },
    render: function() {
        partyName = (this.props.candidate.partyName == undefined) ? "Išsikėlęs pats" : this.props.candidate.partyName;
        return (
            <div className="unit">
                  <div className="list-group-item">
                    <div>
                      <div style={{height: "20px"}}>
                        <div className="col-md-4">
                            <img src="app/imgs/boss.png" style={ styles.image }/> &nbsp;
                            {this.props.candidate.firstName} &nbsp; {this.props.candidate.lastName}
                        </div>
                        <div className="col-md-4">
                            <img src="app/imgs/political_party.png" style={ styles.image }/> &nbsp;
                            {partyName}
                        </div>
                        <div className="col-md-2" style={{ textAlign: 'right' }}><span>Balsai:</span></div>
                        <div className="col-md-2 candidate-votes-input">
                            <input
                                type="text"
                                className="form-control county-results-input"
                                onChange={this.changeVotes}
                                value={this.props.votes}
                            />
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        );
    }
});

module.exports = CandidateDisplayComponent;
