import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import PrivateRoute from './auth/privateRoute';
import Logout from './auth/logout';
import AuthButton from './auth/authButton';

//importing the screens
import EventCreateScreen from './screens/EventCreate';
import EventDetailScreen from './screens/EventDetail';
import EventListingScreen from './screens/EventListing';
import GoogleMapsViewScreen from './screens/GoogleMapsView';
import GroupCreateScreen from './screens/GroupCreate';
import GroupDetailScreen from './screens/GroupDetail';
import GroupListingScreen from './screens/GroupListing';
import LoginScreen from './screens/Login';
import ProfileScreen from './screens/Profile';
import RegisterScreen from './screens/Register';

class Navigation extends Component {

    //having home page be the event listings screen
    render() {
        return (
            <Router>
                <Fragment>
                    <AuthButton />
                    <Switch>
                        <Route exact path="/" component={EventListingScreen} />
                        <Route path="/login" component={LoginScreen} />
                        <Route path="/events/:id" component={EventDetailScreen} />
                        <Route path="/googleMapsView" component={GoogleMapsViewScreen} />
                        <PrivateRoute path="/groups/create" component={GroupCreateScreen} />
                        <PrivateRoute path="/events/create" component={EventCreateScreen} />
                        <Route path="/groups/:id" component={GroupDetailScreen} />
                        <Route path="/groups" component={GroupListingScreen} />
                        <Route path="/googleMapsView" component={GoogleMapsViewScreen} />
                        <PrivateRoute path="/users/profile" component={ProfileScreen} />
                        <Route path="/users/register" component={RegisterScreen} />
                        <Route path="/logout" component={Logout} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;