import React, { Component, Fragment } from 'react';
import { isLoggedIn } from '../../services/user';
import { Button } from 'react-bootstrap';
import AuthButton from '../auth/authButton';



export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // TODO: 
    // change avatar to have user img

    render() {
        const isLoggedIn = this.state.isLoggedIn
        console.log('attempting to render the header')
        
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg headerNavBar">
                    
                    {/* Search Bar */}
                    <form className="form-inline my-2 my-lg-0 headerSearchBar">
                        <input className="form-control mr-sm-2 searchBar" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0 searchBarButton" type="submit">Search</button>
                    </form>
                    {/* end search bar */}
                
                    {/* start Login/LogOut Btns */}
                    <AuthButton />
                    {/* end login/out buttons */}


                    {/* Display "Create new Group" button if signed in. Else, Display NONE */}

                    {isLoggedIn ? (
                        <Fragment>
                        <Link to="/events/create">
                            <button type="button" class="btn btn-success newGroupBtn">New Event</button>
                        </Link>
                        <Link to="/users/profile">
                            <img src="avatar.png" alt="Avatar" class="avatar" />
                        </Link>
                        </Fragment>
                    ) : (null)}



                {/* Display picture is anchor to user profile page */}
                </nav>
            </Fragment>
        )
    }

}