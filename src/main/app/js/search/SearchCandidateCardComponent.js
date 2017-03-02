var React = require('react');
var truncate = require('truncate');
var text = "Candidato aprasymas turi buti pakankamai ilgas kad galetu butis sutrumpiontas";
var styles = {"image": {width: 20, height: 20}, "marginLeft": {marginLeft: 25}}
var partyName;

function SearchCandidateCardComponent(props) {
  partyName = (props.candidate.partyName == undefined) ? "Išsikėlęs pats" : props.candidate.partyName;
  return (
        <div className="well well-sm candidate-card-wide">
                <div className="row candidate-card-low">
                    <div className="col-sm-8 col-md-12" style={{backgroundColor: "white"}}>
                        <p style={{ marginTop: 15 }}>
                            <h4 style={ styles.marginLeft }>
                                <span>
                                    <span style={{color:'#1c9312', fontWeight:"bold"}}>
                                        {props.candidate.firstName} &nbsp; {props.candidate.lastName}
                                    </span>
                                </span>
                                <span
                                    className="glyphicon glyphicon-remove-circle"
                                    aria-hidden="true"
                                    style={{ float: 'right', cursor: 'pointer' }}
                                    onClick={props.hideDetails}>
                                </span>
                            </h4>
                        </p>
                        <p>
                            <small><img src="app/imgs/political_party.png" style={ styles.image }/>&nbsp;&nbsp;<b>Partija:</b>&nbsp; {partyName}</small>
                        </p>
                        <p>
                            <small><img src="app/imgs/fingerprint.png" style={ styles.image }/>&nbsp;&nbsp;<b>A/K:</b>&nbsp; {props.candidate.personId}</small>
                        </p>
                        <p>
                            <small><img src="app/imgs/cupcake.png" style={ styles.image }/>&nbsp;&nbsp;<b>Gimimo data:</b>&nbsp; {props.candidate.birthDate}</small>
                        </p>
                        <p>
                            <small>
                                <img src="app/imgs/books.png" style={ styles.image }/>&nbsp;&nbsp;
                                <b>Apie:</b>&nbsp;<br />
                                <span style={ styles.marginLeft }>{props.candidate.description}</span>
                            </small>
                        </p>
                        <br />
                        <p>
                            <small>
                                <b style={{color: "red"}}>/funkcionalumo nėra/</b><br />
                                Užimta vieta vienmandačiuose - 10<br />
                                <b>Išrinktas</b>
                            </small>
                        </p>
                        <p>
                            <small>
                                Užimta vieta daugiamandačiuose - 10<br />
                                <b>Neišrinktas</b>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
  );
}

module.exports = SearchCandidateCardComponent;
