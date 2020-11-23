import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Button,
    NavItem
} from 'react-bootstrap';
import { Redirect, NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import "../assets/css/Header.css";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            redirectToReferrer: false,
        };
    }

    handleLogout(event) {
        var self = this;
        // AuthService.LogoutService({ token: authToken() }).then(function (response) {
        //     self.handleResponse(response);
        // });
    }

    handleResponse(response) {
        if (response.status === 200) {
            localStorage.clear();
            this.setState({ redirectToReferrer: true });
        }
    }

    render() {
        if (this.state.redirectToReferrer) {
            return <Redirect push to="/" />;
        }

        return (
            <Navbar inverse fixedTop className="header">
                <Helmet title={'E-Click :: ' + this.props.title} />
                <Navbar.Header>
                    <Button className="side-toggle-btn" onClick={this.props.handler}>
                        <i className="fa fa-bars" />
                    </Button>
                    <div className="d-flex align-items-center header-1-wrapper" >
                        <div className="header-1 d-flex align-items-center">
                            <label className="admin-page-title text-capitalize">
                                {this.props.title}
                            </label>
                        </div>

                    </div>
                    <Navbar.Toggle />

                </Navbar.Header>
                <Navbar.Collapse>

                    <div className="d-flex align-items-center header-2-main">
                        <Button
                            className="logout-btn btn btn-orange header-logout-btn"
                            onClick={event => this.handleLogout(event)}
                        >
                            <i className="fa fa-logout" /> Logout
          </Button>


                        <NavLink to="/help" className="logout-btn help-wrap setting-label">
                            Help
          </NavLink>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
