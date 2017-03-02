var React = require('react');
var axios = require('axios');
var fileDownload = require('react-file-download');

var Tester = React.createClass({
    downloadCSV() {
        axios.get('http://localhost:8080/api/download/testers')
             .then(resp => {
                fileDownload(resp.data, "testData.csv");
                console.log(resp);
             })
             .catch(err => {
                console.log(err);
             });
    },
    render: function() {
        const self = this;
        return (
            <div>
                <button
                    onClick={this.downloadCSV}>
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;
                    Download
                </button>
            </div>
        );
    }
});

module.exports = Tester;
