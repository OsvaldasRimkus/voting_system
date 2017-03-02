/**
 * Created by osvaldas on 17.1.20.
 */

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var CurrentTimeComponent = require('./tiny_components/CurrentTimeComponent');

var NavigationBarComponent = React.createClass ({
    getInitialState: function () {
        return ({
            pageTitle : 'LIETUVOS RESPUBLIKOS SEIMO RINKIMAI',
            logout : ' Atsijungti',
            userName: ' Lankytojas',
            homeButtonText : 'Pradžia'
        })
    },

    render: function () {
        var b1 = {display : 'inline'};
        if(this.props.mainMenu == ''){
            b1 = {display : 'none'}
        }

        var b2 = {display : 'inline'};
        if(this.props.secondMenu == ''){
            b2 = {display : 'none'}
        }

        var b3 = {display : 'inline'};
        if(this.props.thirdMenu == ''){
            b3 = {display : 'none'}
        }

        return (

            <nav className="navbar navbar-default">
                <div className="container-fluid">

                    <div className="navbar-header">

                        {/*<span className="navbar-brand" ><div>PAVADINIMAS</div></span>*/}
                        {/*<span className="navbar-brand" >{this.state.pageTitle}</span>*/}

                        <ul className="nav navbar-nav">
                            {/*<li><a id="homePageButton" onClick={this.props.homePageButtonPressed} href="#"><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Pradžia </a></li>*/}
                            <li><div className="navBarTitle">{this.state.pageTitle}</div></li>
                                <Link to="/">
                                    <button id="homeButton" onClick={this.props.homePageButtonPressed} ><span className="glyphicon glyphicon-home" aria-hidden="true"></span> {this.state.homeButtonText}</button>
                                </Link>
                        </ul>

                        {/*<button className="navBarButton" style={b1}> {this.props.mainMenu}</button>
                        <button className="navBarButton" style={b2}> {this.props.secondMenu}</button>
                        <button className="navBarButton" style={b3}> {this.props.thirdMenu}</button>*/}

                        {/*<span className="navbar-brand" >{this.props.mainMenu}</span>*/}
                        {/*<span className="navbar-brand" >{this.props.secondMenu}</span>*/}
                        {/*<span className="navbar-brand" >{this.props.thirdMenu}</span>*/}
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.state.userName} <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#"><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>{this.state.logout}</a></li>
                                </ul>
                            </li>
                        </ul>
                        {/*<div style={{margin:"15px"}}>
                            <Link to="/prisijungti">
                                <button>Prisijungti</button>
                            </Link>
                        </div>*/}
                        <div style={{margin:"15px"}}>
                            <CurrentTimeComponent/>
                        </div>
                    </div>
                </div>
            </nav>

        );
    }
});

module.exports = NavigationBarComponent;
