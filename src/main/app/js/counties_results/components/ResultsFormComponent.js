var React = require('react');
var SpoiledBallotsInputComponent = require('./SpoiledBallotsInputComponent');

function ResultsFormComponent(props) {
    return (
        <form>
            <SpoiledBallotsInputComponent
                spoiled={props.spoiled}
                changeSpoiled={props.changeSpoiled}
            />
            <div className="list-group-item active">
                <span>{props.header}</span>
            </div>
            <div className="list-group-item" style={{ height: 'auto' }}>
                {props.votees}
            </div>
        </form>
    );
}

module.exports = ResultsFormComponent;
