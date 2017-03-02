var React = require('react');
var NewPartyAsideForm = require('../containers/NewPartyAsideForm');

function PoliticalUnitsComponent(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 units-list-area">
                    <div className="list-group-item list-group-item-success">
                        <span>Partijų sąrašas</span>
                    </div>
                    <div className="list-group-item" style={{ height: 'auto' }}>
                        {props.parties}
                    </div>
                </div>
                <div className="col-md-4 units-create-area">
                    <div className="col-md-11">
                        <NewPartyAsideForm
                            create={props.create}
                            springErrors={props.springErrors}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

module.exports = PoliticalUnitsComponent;
