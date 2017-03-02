const React = require('react');

function LoginComponent(props) {
    return (
        <div>
            <div className="container">
                <h1>Login</h1>
                <div className="col-md-4 col-md-offset-4">
                    <form className="" onSubmit={props.doLogin}>
                        {props.loginError}
                        <div className="form-group">
                            <label>Vardas</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={props.changeName}
                                value={props.username}/>
                        </div>
                        <div className="form-group">
                            <label>Slaptažodis</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={props.changePassword}
                                value={props.password}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Prisijungti</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

module.exports = LoginComponent;