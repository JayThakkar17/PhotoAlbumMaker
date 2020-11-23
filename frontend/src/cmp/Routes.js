import React, { Component } from 'react'
import asyncComponent from '../cmp/AsyncComponent';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Notfound from "./Notfound";
import Dashboard from "./Dashboard";
import CategoryListing from "./CategoryListing";
import AlbumListing from "./AlbumListing";
import AlbumDetail from "./AlbumDetail"
import SocialFollow from "./SocialFollow";
// import Feedback from "./Feedback";
const AfterLoginLayout = asyncComponent(() =>
    import("./layout/AfterLoginLayout")
);

const PrivateRoute = ({ component: Component, title, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            <AfterLoginLayout title={title}>
                <Component {...props} />
            </AfterLoginLayout>}></Route>
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            {/* <Route path='/albums' component={Dashboard}></Route> */}
            <Route path='/dashboard' component={Dashboard}></Route>
            <Route path='/categories' component={CategoryListing}></Route>
            <Route path='/albums/:id' component={AlbumDetail}></Route>
            <Route path='/albums' component={AlbumListing}></Route>
            <Route path="/socialfollow" component={SocialFollow}></Route>
            {/* <Route path='/feedback' component={Feedback}></Route> */}
            {/* <Route path='*' component={Notfound} /> */}
            {/* <PrivateRoute
                exact
                path="/dashboard"
                title="Dashboard"
                component={Dashboard}
            /> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;