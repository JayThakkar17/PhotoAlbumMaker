import React, { Component } from 'react'
import axios from "axios";
import Sidebar from '../cmp/Sidebar';
import { LogOutService, email, isLoggedIn, name } from "../services/Auth";
import { Redirect } from "react-router-dom";
import "../assets/css/Dashboard.css";

export default class Dashboard extends Component {

    state = {
        selectedFiles: null
    }

    fileSelectHandler = event => {
        this.setState({
            selectedFiles: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        axios.post();
    }

    render() {
        if (!isLoggedIn()) {
            return <Redirect push to="/login" />;
        }
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="page-wrap">
                    <h1>Welcome {name()} </h1>
                </div>
                <div className="inner-div">
                    <div>
                        <h1 className="desc">What You Can Do Here</h1>
                        <br />
                        <h3> ⚫ Create Albums</h3>
                        <h3> ⚫ Share Your Albums</h3>
                        <h3> ⚫ Follow Us on Different Social Media Platform</h3>
                    </div>
                </div>
            </div>
        );
    }
}