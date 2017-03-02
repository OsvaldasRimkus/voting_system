var React = require('react');

function SingleCandidatesComponent(props) {    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 units-list-area">
                    <div className="list-group-item list-group-item-success">
                        <span>Apygardų sąrašas</span>
                    </div>
                    <div className="list-group-item" style={{ height: 'auto' }}>
                        {props.districts}
                    </div>
                </div>

                <div className="col-md-4 units-create-area"></div>
            </div>
        </div>
    );
};

module.exports = SingleCandidatesComponent;
