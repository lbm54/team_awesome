import React, { Component } from 'react';
import { isLoggedIn } from '../../services/user';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    let 
    
    // }
    render() {
        const isLoggedIn = this.state.isLoggedIn
        return (
                <Fragment> 
            <div>
              {isLoggedIn ? (
                <LogoutButton onClick={this.handleLogoutClick} />
              ) : (
                <LoginButton onClick={this.handleLoginClick} />
              )}
            </div>
          );
        }
            <nav className="navbar navbar-expand-lg">
            {/* Search Bar */}
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                {/* end search bar */}
                {/* Display "Create new Group" button if signed in. Else, Display sign in button */}
                {/* Display user picture if signed in, else display none */}
            {/* Display picture is anchor to user profile page */}
            </nav>
        </Fragment>
        )
    }

}