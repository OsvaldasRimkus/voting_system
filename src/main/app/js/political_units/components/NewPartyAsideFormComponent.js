var React = require('react');

var NewPartyAsideFormComponent = React.createClass({
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputCounty">Partijos pavadinimas</label>
                        <input type="text" className="form-control" id="inputCountyName" onChange={this.props.changeName} value={this.props.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Įkelti partijos sąrašą</label>
                        <input ref="fileCSV" type="file" id="inputFile"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.props.create.bind(null, this.refs)} className="btn btn-primary btn-md">Sukurti</button>
                    </div>
                </form>
                <div className="form-group errors-area">
                    {this.props.jsErrors}
                    {this.props.springErrors}
                </div>
            </div>
        )
    }
});

module.exports = NewPartyAsideFormComponent;
