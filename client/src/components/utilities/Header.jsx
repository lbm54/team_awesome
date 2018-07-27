import React, { Component } from 'react';
import { isLoggedIn } from '../../services/user';
import { Button } from 'reactstrap';



export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // TODO:
    //  make functions for log in
    // log in event listener set logged in state true
    //  make function for log out
    // log out event listener set logged in state false
    //  write function for create new group button, button on event routes to create page
    // }

    render() {
        const isLoggedIn = this.state.isLoggedIn
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg headerNavBar">
                    <div>
                        {isLoggedIn ? (
                            <LogoutButton onClick={this.handleLogoutClick} />
                        ) : (
                                <LoginButton onClick={this.handleLoginClick} />
                            )}
                    </div>
                    );
                  }
          
        {/* end signin/out buttons */}

                    {/* Search Bar */}
                    <form className="form-inline my-2 my-lg-0 headerSearchBar">
                        <input className="form-control mr-sm-2 searchBar" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0 searchBarButton" type="submit">Search</button>
                    </form>
                    {/* end search bar */}

                    {/* Display "Create new Group" button if signed in. Else, Display sign in button */}
                    <button type="button" class="btn btn-success newGroupBtn">New Group</button>
                </nav>
                {/* Display user picture if signed in, else display none */}
                {/* Display picture is anchor to user profile page */}
            </Fragment>
        )
    }

}