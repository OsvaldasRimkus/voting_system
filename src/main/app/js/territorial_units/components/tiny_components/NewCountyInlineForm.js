var React = require('react');
var Validations = require('../../../utils/Validations');
var Geosuggest = require('react-geosuggest').default;

var NewCountyInlineForm = React.createClass({
    getInitialState: function() {
        return ({ jsErrors: [] });
    },
    submit: function() {
        var errors = Validations.checkErrorsCountyForm(this.props.name, this.props.count, this.props.address);
        if (errors.length > 0) {
            this.setState({ jsErrors: errors });
        } else {
            if (this.state.jsErrors.length > 0) this.setState({ jsErrors: [] });
            this.props.submit();
        }
    },
    jsErrors: function() {
        var style={ marginTop: 10 };
        return Validations.prepareJSerrors(this.state.jsErrors, "Klaida registruojant apylinkę", style)
    },
    springErrors: function() {
        return Validations.prepareSpringErrors(this.props.springErrors);
    },
    hideOtherSuggestions: function() {
        $('.geosuggest__suggests').hide();
    },
    render: function() {
        var jsErrors = (this.state.jsErrors.length > 0) ? this.jsErrors() : [];
        var springErrors = (this.props.springErrors.length > 0) ? this.springErrors() : [];
        return (
            <div>
                <form className="inline-add-county-form" style={{ minHeight: 45 }}>
                    <div className="form-group">
                        <input type="text"
                            onChange={this.props.changeName}
                            className="form-control"
                            value={this.props.name}
                            placeholder="Apylinkės pav."
                        />
                    </div>
                    <div className="form-group">
                        <input type="number"
                            onChange={this.props.changeVoterCount}
                            className="form-control"
                            value={this.props.count}
                            placeholder="Gyv. skaičius"
                            min={1}
                        />
                    </div>
                    <div className="form-group">
                        <Geosuggest
                            ref={el=>this._geoSuggest=el}
                            placeholder="Adresas"
                            inputClassName="form-control"
                            country="lt"
                            queryDelay='500'
                            onSuggestSelect={this.props.setSuggest}
                            onActiveSuggest={this.hideOtherSuggestions}
                            onChange={this.props.changeAddress}
                        />
                    </div>
                    <div className="form-group">
                        <button id="inline-create-btn" className="btn btn-default btn-sm" onClick={this.submit}>
                            Sukurti
                        </button>
                        <button id="inline-cancel-btn" className="btn btn-default btn-sm" onClick={this.props.cancel}>
                            Atšaukti
                        </button>
                    </div>
                </form>
                <div id="inline-form-errors">
                    {jsErrors}
                    {springErrors}
                </div>
            </div>
        )
    }
});


module.exports = NewCountyInlineForm;
