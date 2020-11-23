import "../index.css";
import React, { Component } from 'react'
import Slider from "../cmp/Slider";
import "../assets/css/slider.css";
import { NavLink, Link,Switch,Route } from "react-router-dom";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";

export default class Landing extends Component {
    render() {
        return (
            <div>
<header id="home">
    <div class="container position-relative h-100">
        <nav class="navbar navbar-dark navbar-expand-lg justify-content-between align-items-center">
            <a class="navbar-brand" href="#">
                <defs>
                </defs>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                    <Link className="nav-link" to={"/"}>Home</Link>  
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#features">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#prices">Prices</a>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to={"signup"}>Sign Up</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link"  to={"login"}>Log In</Link>
                    </li>
                </ul>
            </div>
        </nav >
        <div class="container">
            <div class="banner-text">
                <h1 class="site-intent-title uniheavy">
                    Store & Share Album to The Customer.
                </h1>
                <a href="#features" class="banner-btn">See How</a>
            </div>
        </div>
        <div class="portfolio-slider pl-4 pr-4">
            <div class="stack w-100">
        <Slider></Slider>
           </div>
        </div>
   </div>
</header>
    <section class="features-section section--pad" id="features">
        <div class="container">
            <div class="row justify-content-center fetures_head">
                <div class="col-xs-12 text-center">
                    <div class="section--title unibold">Features</div>
                    <div class="section--subdesc brandonregular"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="d-flex">
                        <div class="mr-3 min-40">
                        </div>
                        <div>
                            <h4 class="fet_title mt-0 mb-1 brandonmedium">
                                Promote Your Self
                      </h4>
                            <p class="fet_desc myriad-pro">
                               Publish Your Content Here, and Promote Your Self.
                      </p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4 pr-md-0">
                    <div class="d-flex">
                        <div class="mr-3 min-40">
                        </div>
                        <div>
                            <h4 class="fet_title mt-0 mb-1 brandonmedium">
                                Create Album
                      </h4>
                            <p class="fet_desc myriad-pro">
                               Create and Manage Your Albums.
                      </p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="d-flex">
                        <div class="mr-3 min-40">
                        </div>
                        <div>
                            <h4 class="fet_title mt-0 mb-1 brandonmedium">
                                Share Albums
                      </h4>
                            <p class="fet_desc myriad-pro">
                                You Can Share Your Albums Privately or Publically.
                      </p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4 pr-md-0">
                    <div class="d-flex">
                        <div class="mr-3 min-40">
                        </div>
                        <div>
                            <h4 class="fet_title mt-0 mb-1 brandonmedium">
                                Upload Photos
                      </h4>
                            <p class="fet_desc myriad-pro">
                            Upload Photos in an Album.
                      </p>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="pricing-section section--pad" id="prices">
        <div class="container">
            <div class="row justify-content-center fetures_head mb-5">
                <div class="col-xs-12 text-center">
                    <div class="section--title unibold">Pricing</div>
                    <div class="section--subdesc brandonregular"></div>
                </div>
            </div>
            <div class="row justify-content-center mb-4">
                <div class="col-md-10">
                    <div class="d-md-flex justify-content-around">
                        <div class="priceCard">
                            <div class="title text-center">
                                <h2 class="time unibold">First Year</h2>
                                <h2 class="price brandonbold">
                                </h2>
                            </div>
                            <ul class="plan-list">
                                <li>
                                    Get Extra Space for Uploading Photos.
                             
                          </li>
                             
                          <li>
                                        Get Access to All Features.
                          </li>
                                    <li>
                                        First Year Free.
                          </li>
                      </ul>
                  </div>
                            <div class="priceCard">
                                <div class="title text-center">
                                    <h2 class="time unibold">After 1 Year 
                          </h2>
                                    <h2 class="price brandonbold">
                                         per Year</h2>
                                </div>
                                <ul class="plan-list">
                                    <li>Unlimited Space for Uploading Photos.<br />
                              
                          </li>
                                    <li>
                                        Free Domain Name.
                          </li>
                                    <li>
                                       Get Access to New Features.
                          </li>
                                    <li>
                                       24x7 Support.
                          </li>
                                </ul>
                            </div>
                        </div>
                        <div class="text-center brandonregular mt-5">
                            <p class="mb-0">Cancel your Subscription Any Time.</p>
                            <div class="mt-5">
                                <Link to={"Login"} className="get_start text-uppercase">Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
        );
    }
}
