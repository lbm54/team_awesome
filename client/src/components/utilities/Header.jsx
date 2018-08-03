import React, { Component, Fragment } from "react";
import AuthButton from "../auth/authButton";
import { Link } from "react-router-dom";
import {getUserId} from "../../services/user";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
    };
  }

  // TODO:
  // change avatar to have user img

  render() {
    let userId = getUserId();
    let profileLink = `/users/profile/${userId}`;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img src="/images/grouprLogoNoText.png" className="headerImg" />
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
                <Link className="nav-link" to="/events">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/groups">
                  Groups
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={profileLink}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/googleMapsView">
                  Map View
                </Link>
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
      </Fragment>
    );
  }
}
