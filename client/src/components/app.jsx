import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import PrivateRoute from "./auth/privateRoute";
import Logout from "./auth/logout";
import AuthButton from "./auth/authButton";
import Message from './message';

//importing the screens
import EventCreateScreen from "./screens/EventCreate";
import EventDetailScreen from "./screens/EventDetail";
import EventListingScreen from "./screens/EventListing";
import EventEditScreen from "./screens/EventEdit";
import GoogleMapsViewScreen from "./screens/GoogleMapsView";
import GroupCreateScreen from "./screens/GroupCreate";
import GroupDetailScreen from "./screens/GroupDetail";
import GroupListingScreen from "./screens/GroupListing";
import GroupEditScreen from "./screens/GroupEdit";
import UserEditScreen from "./screens/UsersEdit";
import LoginScreen from "./screens/Login";
import ProfileScreen from "./screens/Profile";
import RegisterScreen from "./screens/Register";
import Header from "./utilities/Header";
import Footer from "./utilities/Footer";
import {isLoggedIn} from '../services/user';
import Stripe from './stripe';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          {/* <Message /> */}
          <Switch>
            <Route exact path="/" component={EventListingScreen} />
            <Route exact path="/events" component={EventListingScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/events/detail/:id" component={EventDetailScreen} />
            <PrivateRoute path="/events/edit/:id" component={EventEditScreen} />
            <Route path="/googleMapsView" component={GoogleMapsViewScreen} />
            <PrivateRoute path="/groups/create" component={GroupCreateScreen} />
            <PrivateRoute path="/events/create" component={EventCreateScreen} />
            <PrivateRoute path="/groups/edit/:id" component={GroupEditScreen} />
            <Route path="/groups/detail/:id" component={GroupDetailScreen} />
            <Route path="/groups" component={GroupListingScreen} />
            <Route path="/googleMapsView" component={GoogleMapsViewScreen} />
            {/* <Route path="/users/profile/edit/:id" component={UserEditScreen} /> */}
            <PrivateRoute path="/users/profile" component={ProfileScreen} />
            <Route path="/users/register" component={RegisterScreen} />
            <Route path="/stripe" component={Stripe} />
            <Route path="/logout" component={Logout} />
          </Switch>
          <Footer isLoggedIn={isLoggedIn()} />
        </Fragment>
      </Router>
    );
  }
}

export default Navigation;
