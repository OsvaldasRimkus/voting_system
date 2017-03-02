var React = require('react');
var RepresentativePanelComponent = require('../components/RepresentativePanelComponent');
var axios = require('axios');
var spring = require('../config/SpringConfig');

var RepresentativeHomeContainer = React.createClass({
    propTypes: {
        
    }, 
    getInitialState() {
        return {
            representative: undefined,
            countyId: undefined,
            districtId: undefined
        };
    },
    componentDidMount() {
        const url = spring.localHost.concat("/api/county-rep/") + this.props.params.id;

        axios.get(url)
            .then(function(response) {
                this.setState({ 
                    representative: response.data,
                    countyId: response.data.countyId,
                    districtId: response.data.districtId
                 });
            }.bind(this))
            .catch(function(err) {
                console.log(err);
            });
    },

    render: function() {
        let childrenWithProps = React.Children.map(this.props.children, (child) => 
            React.cloneElement(child, {
                representative: this.state.representative,
                countyId: this.state.countyId,
                districtId: this.state.districtId
            })
        );

        return (
            <div>
                <RepresentativePanelComponent />
                <div className="main-layout">
                    {childrenWithProps}
                </div>
            </div>
        );
    }
});

module.exports = RepresentativeHomeContainer;