var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var truncate = require('truncate');
var ConfirmAction = require('../../components/tiny_components/ConfirmAction');

function CountyDisplayComponent(props) {
    var truncateLength = 30;
    var del = function() { props.delete(props.index) };
    var edit = function() { };
    var popup = function() { $('.popoverCounty').popover({ trigger: "hover" }) };
    var popupAddress = function(e) {
      if (props.county.address.length >= truncateLength) {
          $("." + e.target.className).popover({ trigger: "click" })
      };
    };
    var handStyle = {};
    if (props.county.address.length >= 30) { handStyle = {cursor: 'pointer'} }

    return (
        <div className="list-group-item">
            <p style={{ display: 'inline-block', width: '30%' }} id={"county-title-" + props.index}>
                <span className="glyphicon glyphicon-list-alt"></span>&nbsp;{props.county.name}
            </p>
            <p style={{ display: 'inline-block', width: '15%' }} id={"county-voters-count-" + props.index}>
                <span className="glyphicon glyphicon-user"></span>&nbsp;{props.county.voterCount}
            </p>
            <p style={{ display: 'inline-block', width: '40%' }} id={"county-address-" + props.index}>
                <span className="glyphicon glyphicon-map-marker"></span>&nbsp;
                <span
                    className={"popoverAddress-" + props.index}
                    onMouseOver={popupAddress}
                    data-content={props.county.address}
                    rel="popover"
                    data-placement="top"
                    style={ handStyle }
                >
                    {truncate(props.county.address, truncateLength)}
                </span>
            </p>
            <p className="unit-actions-area">
                <span className="glyphicon glyphicon-edit popoverCounty remove-units-element"
                    id={"edit-county-button-" + props.index}
                    style={{ cursor: 'pointer' }}
                    onClick={edit}
                    onMouseOver={popup}
                    data-content="Redaguoti"
                    rel="popover"
                    data-placement="top"
                >
                </span>
                <ConfirmAction
                    title="Ar tikrai norite pašalinti apylinę?"
                    body="Duomenų atstatymas neįmanomas."
                    onConfirm={del}
                >
                    <span className="glyphicon glyphicon-remove-sign popoverCounty remove-units-element"
                        id={"remove-county-button-" + props.index}
                        onMouseOver={popup}
                        data-content="Ištrinti"
                        rel="popover"
                        data-placement="top"
                    >
                    </span>
                </ConfirmAction>
            </p>
        </div>
    );
};

module.exports = CountyDisplayComponent;
