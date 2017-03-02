var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var HomePageComponent = React.createClass({
    render: function () {
        return (
            <div id="homePageButtonsRow">

                <div className="firstDivAfterHeader"></div>

                <div className="homePageButtonsRow">
                    <div className="col-sm-4">
                        <Link to="paieska" className="NoUnderlineLink" href="#" title="title">
                            <button className="frontPageButton" id="buttonElectionResults"><span className="glyphicon glyphicon-search"></span><div className="innerButtonDiv">{this.props.results}</div></button>
                        </Link>
                    </div>
                    <div className="col-sm-4">
                        <Link to="atstovui" className="NoUnderlineLink" href="#" title="title">
                            <button className="frontPageButton" id="buttonCountyRepresentatives"><span className="glyphicon glyphicon-user"></span><div className="innerButtonDiv">{this.props.representatives}</div></button>
                        </Link>
                    </div>
                    <div className="col-sm-4">
                        <Link to="administravimas" className="NoUnderlineLink" href="#" title="title">
                            <button className="frontPageButton" id="buttonAdministration"><span className="glyphicon glyphicon-cog"></span><div className="innerButtonDiv">{this.props.admin}</div></button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = HomePageComponent;
