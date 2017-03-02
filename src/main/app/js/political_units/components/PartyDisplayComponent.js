var React = require('react');

function PartyDisplayComponent(props) {
    return (
        <div className="unit">
            <div className="list-group-item list-group-item-success">
                <div onClick={props.toggleShow} style={{ cursor: 'pointer' }}>
                    {props.name}
                </div>
            </div>
            <div style={ props.display }>
                <div className="list-group-item">
                    {props.actions}
                    <b style={props.displayLoadingIcon}>Prašome palaukti&nbsp;</b>
                    <img style={props.displayLoadingIcon} src="app/imgs/axios-loader.gif" alt="working-hard"/>
                    {props.confirmDeleteParty}
                </div>
                {props.candidates}
            </div>

        </div>
    );
}

module.exports = PartyDisplayComponent;
