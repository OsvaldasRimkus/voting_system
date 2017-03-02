var React = require('react');
var Validations = require('../../utils/Validations');
var NewPartyAsideFormComponent = require('../components/NewPartyAsideFormComponent');

var NewPartyAsideForm = React.createClass({
    getInitialState: function() {
        return ({ jsErrors: [], springErrors: [], partyName: "" });
    },
    componentWillReceiveProps: function(newProps) {
        if (newProps.springErrors != this.state.springErrors) {
            this.setState({ springErrors: newProps.springErrors })
        }
    },
    create: function(refs) {
        var file = refs.fileCSV.files[0];
        var errors = Validations.checkErrorsPartyAsideForm(this.state.partyName, file);

        if (errors.length > 0) {
            this.setState({ jsErrors: errors });
        } else {
            var fd = new FormData();
            fd.append('file',file);
            refs.fileCSV.value = "";
            this.setState({ jsErrors: [], partyName: "" });
            this.props.create(fd, this.state.partyName);
        }
    },
    handleNameChange: function(e) {
        this.setState({ partyName: e.target.value });
    },
    prepareSpringErrors: function() {
        var errors = [];
        if (this.props.springErrors.length > 0) {
            errors = Validations.prepareSpringErrors(this.state.springErrors);
        }
        return errors;
    },
    prepareJSerrors: function() {
        var errors = [];
        if (this.state.jsErrors.length > 0) {
            errors = Validations.prepareJSerrors(this.state.jsErrors, "Klaida registruojant partiją!");
        }
        return errors;
    },
    render: function() {
        return (
            <NewPartyAsideFormComponent
                name={this.state.partyName}
                changeName={this.handleNameChange}
                create={this.create}
                jsErrors={this.prepareJSerrors()}
                springErrors={this.prepareSpringErrors()}
            />
        );
    }
});

module.exports = NewPartyAsideForm;
