/**
 * Created by osvaldas on 17.2.7.
 */
var React = require('react');
var ConfirmAction = require('../../components/tiny_components/ConfirmAction');

var CountyRepresentativeListLineComponent = React.createClass ({
    onRemoveRep: function () {
        this.props.onDeleteRepresentative(this.props.repData.id, this.props.index);
    },

    render: function () {
        return (
            <div className="list-group-item passive">
                <div>
                    <div style={{height: "20px"}}>

                        <div className="col-md-4">{this.props.repData.firstName + " " + this.props.repData.lastName}</div>

                        {/*<div className="col-md-2">{this.props.repData.firstName}</div>*/}
                        {/*<div className="col-md-2">{this.props.repData.lastName}</div>*/}
                        <div className="col-md-4">{this.props.repData.countyName} ({this.props.repData.districtName})</div>

                        <div className="col-md-3">{this.props.repData.email}</div>
                        <div className="col-md-1" style={{ textAlign: 'center' }}>
                            <ConfirmAction
                                title={"Norite pašalinti " + this.props.repData.firstName + " " + this.props.repData.lastName + " iš apylinkės " + this.props.repData.countyName +" atstovo pareigų ?"}
                                body="Duomenų atstatymas bus neįmanomas."
                                onConfirm={this.onRemoveRep}
                            >
                                <span
                                    className="glyphicon glyphicon-remove-sign remove-representative confirmation-buttons"
                                    id={"remove-representative-" + this.props.id}
                                >
                                </span>
                            </ConfirmAction>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
});

module.exports = CountyRepresentativeListLineComponent;
