var React = require('react');
var styles = {"image": {width: 20, height: 20}}

var SearchCandidateComponent = React.createClass({
    showDetails: function() {
        this.props.showDetails(this.props.candidate);
    },
    render: function() {
        var partyName = (this.props.candidate.partyName == undefined) ? "Išsikėlęs pats" : this.props.candidate.partyName;
        return (
            <div className="unit">
                  <div className="list-group-item" style={{ cursor: "pointer" }} onClick={this.showDetails}>
                      <div style={{height: 20}}>
                        <div className="col-md-5">
                            <img src="app/imgs/boss.png" style={ styles.image }/> &nbsp;
                            {this.props.candidate.firstName} &nbsp; {this.props.candidate.lastName}
                        </div>
                        <div className="col-md-6">
                            <img src="app/imgs/political_party.png" style={ styles.image }/> &nbsp;
                            {partyName}
                        </div>
                        <div className="col-md-1">----------</div>
                      </div>
                  </div>
            </div>
        );
    }
});

module.exports = SearchCandidateComponent;
