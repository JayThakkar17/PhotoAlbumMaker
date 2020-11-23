import React, { Component } from 'react'
import signupValidationHandler from "./signupValidationHandler";
import "../assets/css/Signup.css";
import { SignupService } from "../services/Auth";
import { Redirect, Link } from "react-router-dom";

export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        const initialState = {
            signupForm: {
                name: '',
                lastname: '',
                email: '',
                experience: '',
                password: '',
                contactno: '',
            },
            signup_error: '',
            redirectToReferrer: false
        };
        return initialState;
    }

    handleChange(e) {
        const signupForm = this.state.signupForm;
        var key = e.target.name;
        signupForm[key] = e.target.value;
        this.setState({
            signupForm
        });
    }

    handleSignup(event) {
        var self = this;
        event.preventDefault();
        SignupService(self.state.signupForm)
            .then(function (response) {
                console.log(response);
                self.handelResponse(response);
            })
            .catch(function (errors) {
                if (errors.length > 0) {
                    document.getElementsByClassName('login-btn')[0].disabled = false
                    self.setState({ signup_error: signupValidationHandler(errors) });
                } else {
                    console.log(errors.response);
                }
            });
    }

    handelResponse(response) {
        if (response.status === 200) {
            this.setState({ redirectToReferrer: true });
        } else {
            console.log('Can Not be Register');
            alert('Can Not Be Registered');
        }
    }

    render() {
        const { signup_error } = this.state;
        if (this.state.redirectToReferrer) {

            return <Redirect push to={"Login"} />;


        }
        return (
            <div className="first-div">
                <div className="column">
                    <h1>Register Here</h1>
                    <div className="form-group text-center">
                        <label className="col-sm-1">First Name</label>
                        <input type="text" className="col-sm-2" name="name" placeholder="First Name" onChange={this.handleChange.bind(this)} required />
                        <span className="custom-addon login-addon">*</span>
                        {signup_error['name'] && (
                            <span className="input-error text-red">
                                {signup_error['name']}
                            </span>
                        )}
                    </div>
                    <div className="form-group text-center">
                        <label className="col-sm-1">Last Name</label>
                        <input type="text" className="col-sm-2" name="lastname" placeholder="Last Name" onChange={this.handleChange.bind(this)} />
                        <span className="custom-addon login-addon">*</span>
                        {signup_error['lastname'] && (
                            <span className="input-error text-red">
                                {signup_error['lastname']}
                            </span>
                        )}
                    </div>
                    <div className="form-group text-center">
                        <label className="col-sm-1">Email</label>
                        <input type="text" className="col-sm-2" name="email" placeholder="Email" onChange={this.handleChange.bind(this)} />
                        <span className="custom-addon login-addon">*</span>
                        {signup_error['email'] && (
                            <span className="input-error text-red">
                                {signup_error['email']}
                            </span>
                        )}
                    </div>
                    <div className="form-group text-center">
                        <label className="col-sm-1">Password</label>
                        <input type="password" className="col-sm-2" name="password" placeholder="Password" onChange={this.handleChange.bind(this)} />
                        <span className="custom-addon login-addon">*</span>
                        {signup_error['password'] && (
                            <span className="input-error text-red">
                                {signup_error['password']}
                            </span>
                        )}
                    </div>
                    <div className="form-group text-center">
                        <label className="col-sm-1">Experience</label>
                        <input type="text" className="col-sm-2" name="experience" placeholder="Experience" onChange={this.handleChange.bind(this)} />
                        <span className="custom-addon login-addon">*</span>
                        {signup_error['experience'] && (
                            <span className="input-error text-red">
                                {signup_error['experience']}
                            </span>
                        )}
                    </div>
                    <div className="form-group text-center">
                        <label className="col-sm-1">Contact</label>
                        <input type="text" className="col-sm-2" name="contactno" placeholder="Contact Number" onChange={this.handleChange.bind(this)} />
                        <span className="custom-addon login-addon">*</span>
                        {signup_error['contactno'] && (
                            <span className="input-error text-red">
                                {signup_error['emcontactnoail']}
                            </span>
                        )}
                    </div>
                    <input type="submit" value="Register" className="button" onClick={this.handleSignup.bind(this)} />
                    <Link className="button" to={"login"}>Login</Link>
                </div>
            </div>
        );
    }
}
