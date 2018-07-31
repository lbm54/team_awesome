import React, { Component, Fragment } from "react";
import { isLoggedIn } from "../../services/user";
import { Button } from "react-bootstrap";
import AuthButton from "../auth/authButton";
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // TODO:
  // change avatar to have user img

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Groupr
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse py-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/">
                  <a className="nav-link" href="#">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link" href="#">
                    Events
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="groups/list">
                  <a className="nav-link" href="#">
                    Groups
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="users/profile">
                  <a className="nav-link" href="#">
                    Profile
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Admin
                </a>
              </li>
            </ul>
            <AuthButton />
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-light my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>

        {/* <nav classNameName="navbar navbar-expand-lg headerNavBar">
                    
                    Search Bar
                    <form classNameName="form-inline my-2 my-lg-0 headerSearchBar">
                        <input classNameName="form-control mr-sm-2 searchBar" type="search" placeholder="Search" aria-label="Search" />
                        <button classNameName="btn btn-outline-success my-2 my-sm-0 searchBarButton" type="submit">Search</button>
                    </form>
                    end search bar
                
                    start Login/LogOut Btns
                    <AuthButton />
                    end login/out buttons


                    Display "Create new Group" button if signed in. Else, Display NONE

                    {isLoggedIn ? (
                        <Fragment>
                        <Link to="/events/create">
                            <button type="button" className="btn btn-success newGroupBtn">New Event</button>
                        </Link>
                        <Link to="/users/profile">
                            <img src="avatar.png" alt="Avatar" className="avatar" />
                        </Link>
                        </Fragment>
                    ) : (null)}



                Display picture is anchor to user profile page
                </nav> */}
      </Fragment>
    );
  }
}
