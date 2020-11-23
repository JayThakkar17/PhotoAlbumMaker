import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";
import "../assets/css/SocialFollow.css";

export default function SocialFollow() {
    return (
        <div class="social-container">
            <h3>Connect With Us</h3>
            <hr />
            <a href="https://www.youtube.com"
                className="youtube social">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://www.facebook.com"
                className="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.twitter.com"
                className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com"
                className="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <br /> <br /> <br /> <br /> <br />
            <div>
                <h3>Back to Dashboard</h3>
                <br />
                <Link to={"/dashboard"} className="button">Back</Link>
            </div>
        </div>
    );
}