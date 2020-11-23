import React, { Component } from 'react'
import "../assets/css/Login.css";
import { LoginService } from "../services/Auth";
import { isLoggedIn, currentUserRole } from "../services/Auth";
import { Redirect, Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState() {
        const initialState = {
            loginForm: {
                email: '',
                password: '',
            },
            role: '',
            login_error: this.props.location.state,
            redirectToReferrer: false
        };

        return initialState;
    }

    handleChange(e) {
        const loginForm = this.state.loginForm;
        var key = e.target.name;
        loginForm[key] = e.target.value;
        this.setState({
            loginForm
        });
    }

    handleLogin(event) {
        var self = this;
        event.preventDefault();
        LoginService(self.state.loginForm)
            .then(function (response) {
                console.log(response)
                self.handelResponse(response);
            })
            .catch(function (error) {
                self.setState({ login_error: error.response.data.error });
            });
    }

    // validate = () => {
    //     let emailError = "";
    //     if (!this.state.email.includes('@')) {
    //         emailError = 'invalid email';
    //     }
    //     if (emailError) {
    //         this.setState(emailError);
    //         return false;
    //     }
    //     return true;
    // }

    handelResponse(response) {
        if (response.status === 200) {
            localStorage.setItem('AUTH_TOKEN', response.data.token);
            localStorage.setItem(
                'Email',
                JSON.stringify(response.data.user.email)
            );
            localStorage.setItem(
                'Name',
                JSON.stringify(response.data.user.name)
            );
            localStorage.setItem(
                'User_id',
                JSON.stringify(response.data.user._id)
            );
            this.setState({ redirectToReferrer: true });
        } else {
            console.log('Invalid email and password');
            alert('Invalid email and password');
        }
    }

    render() {
        const { login_error } = this.state;
        if (this.state.redirectToReferrer) {
            return <Redirect push to={"dashboard"} />;
        }
        return (
            <div className="first-div">
                <div className="column">
                    <h1>Login</h1>
                    <div className="form-group text-center">
                        <label className="col-sm-1">Email</label>
                        <input type="text" className="col-sm-2" name="email" placeholder="Email" onChange={this.handleChange.bind(this)} />
                        {/* {this.state.login_error ? <div>
                            {this.state.login_error}
                        </div> : null} */}
                        {(login_error !== undefined && login_error && login_error.from === undefined) && (
                            <span className="input-error text-red"><br /><br />{login_error}</span>
                        )}
                    </div>
                    <div className="form-group text-center">
                        <label className="col-sm-1">Password</label>
                        <input type="password" className="col-sm-2" name="password" placeholder="Password" onChange={this.handleChange.bind(this)}
                        />
                        {/* {this.state.login_error ? <div>
                            {this.state.login_error}
                        </div> : null} */}
                        {(login_error !== undefined && login_error && login_error.from === undefined) && (
                            <span className="input-error text-red"><br /><br />{login_error}</span>
                        )}
                    </div>
                    <input type="submit" value="Login" className="button" onClick={this.handleLogin.bind(this)} />

                    <Link className="button" to={"signup"}>Register</Link>
                </div>
            </div>
        );
    }
}