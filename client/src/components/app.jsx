import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import HelloWorld from './hello';
import GoodbyeWorld from './goodbye';
import Donate from './donate';

import PrivateRoute from './auth/privateRoute';
import Login from './auth/login';
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

    render() {
        return (
            <Router>
                <Fragment>
                    <Link to="/goodbye">Goodbye</Link>
                    <AuthButton />
                    <Switch>
                        <Route exact path="/" component={EventListingScreen} />
                        <Route path="/login" component={LoginScreen} />
                        <Route path="/events/:id" component={EventDetailScreen} />
                        <Route path="/googleMapsView" component={GoogleMapsViewScreen} />
                        <PrivateRoute path="/groups/create" component={GroupCreateScreen} />
                        <PrivateRoute path="/event/create" component={EventCreateScreen} />
                        <Route path="/groups/:id" component={GroupDetailScreen} />
                        <Route path="/groups" component={GroupListingScreen} />
                        <Route path="/googleMapsView" component={GoogleMapsViewScreen} />
                        <PrivateRoute path="/user/profile" component={ProfileScreen} />
                        <Route path="/user/register" component={RegisterScreen} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/donate" component={Donate} />
                        <PrivateRoute path="/goodbye" component={GoodbyeWorld} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;