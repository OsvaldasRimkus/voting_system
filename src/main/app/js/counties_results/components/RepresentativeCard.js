var React = require('react');

var RepresentativeCard = React.createClass({
    propTypes: {
        representative: React.PropTypes.object.isRequired
    }, 
    render: function() {
        let rep = this.props.representative
        return (
            <div>
                <div className="list-group-item active">
                    Prisijungęs kaip
                </div>
                <div className="list-group-item">
                    <img src="app/imgs/representative.png" style={{ width: 20, height: 20 }}/> &nbsp;
                    <span>{rep.firstName}</span> &nbsp;
                    <span>{rep.lastName}</span>
                </div>
            </div>
        );
    }
});

module.exports = RepresentativeCard;