import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { LogOutService, email } from "../services/Auth";
import "../assets/css/Sidebar.css";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            redirectToReferrer: false
        };
    }

    handleLogout(event) {
        var self = this;
        LogOutService({ email: email() }).then(function (response) {
            self.handleResponse(response);
        });
    }

    handleResponse(response) {
        if (response.status === 200) {
            localStorage.clear();
            this.setState({ redirectToReferrer: true });
        }
    }

    render() {
        const { user, redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect push to="/" />;
        }
        return (
            <Col className="sidebar">
                <Col xs={12} className="user-wrap">
                    <Col xs={12} className="text-center">
                        <Link to={'/albums'}
                            className="text-white"
                        >
                            <h4 className="album-num">{user.album_count}</h4>
                            <label className="album-name">Photo Album Maker</label>
                        </Link>
                    </Col>
                </Col>
                <Col xs={12} className="link-wrap">
                    <ListGroup className="sidebar-nav-links">
                        <NavLink to="/dashboard">
                            <ListGroupItem href="">
                                Dashboard
                            </ListGroupItem>
                        </NavLink>
                        <NavLink to="/albums">
                            <ListGroupItem>
                                Albums
                            </ListGroupItem>
                        </NavLink>
                        <NavLink to="/categories">
                            <ListGroupItem>
                                Categories
              </ListGroupItem>
                        </NavLink>
                        <NavLink to="/socialfollow">
                            <ListGroupItem>
                                Follow Us
              </ListGroupItem>
                        </NavLink>
                    </ListGroup>
                    <Button
                        className="logout-btn btn btn-orange header-logout-btn"
                        onClick={event => this.handleLogout(event)}
                    >
                        <i className="fa fa-logout" /> Logout
          </Button>
                </Col>
            </Col>
        );
    }
}