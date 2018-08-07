import React, { Component, Fragment } from "react";
import * as usersService from "../../../services/users";
import { Link } from "react-router-dom";
import {me} from '../../../services/user';

class UserDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    };

    this.handleLeaveGroup = async (groupId) => {
      let user = await me();
      let user_id = user.id;
      let object = {
        user_id,
        group_id: groupId
      }
      try {
        fetch("/api/users/removeFromGroup", {
          method: "POST",
          body: JSON.stringify(object),
          headers: new Headers({ "Content-Type": "application/json" })
        });
        this.props.history.push('/events');
      } catch(err) {
        console.log(err);
      }
    }
  }

  async componentDidMount() {
    try {
      let userRaw = await me();
      let userId = userRaw.id;
      let user = await usersService.one(userId);
      console.log(user);
      if (!user.profile_picture_link)
        user.profile_picture_link = `/images/default_user_img.png`;
      this.setState({ user });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.user) {
      let groups, events;
      if (this.state.user.groups) {
        groups = this.state.user.groups.map((group, index) => {
          let groupLink = `/groups/detail/${group.id}`;
          return (
            <div className="card eventCard" key={index}>
              <div className="card-body">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text">{group.blurb}</p>
                <Link to={groupLink} className="btn btn-info">
                  More Details
                </Link>
                <button className="ml-3 mt-0 btn btn-success" onClick={(event) => this.handleLeaveGroup(group.id)}>
                  Leave this Group
                </button>
              </div>
            </div>
          );
        });
      } else groups = <li className="list-group-item">None</li>;
      if (this.state.user.events) {
        events = this.state.user.events.map((event, index) => {
          let eventLink = `/events/detail/${event.id}`;
          return (
            <div className="card eventCard" key={index}>
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.blurb}</p>
                <Link to={eventLink} className="btn btn-info">
                  More Details
                </Link>
              </div>
            </div>
          );
        });
      } else events = <li className="list-group-item">None</li>;
      return (
        <Fragment>
          <div className="container p-5 userBioContainer">
            <h1 className="welcomeUser">Welcome, {this.state.user.first_name}!</h1>
            <div className="userImageContainer">
              <img
                className="userImage rounded"
                src={this.state.user.profile_picture_link}
                alt="Card image cap"
              />
              </div>
            <div className="eventCard">
              <ul className="list-group list-group-flush">
                <li className="list-group-item userAbout">
                  <h5 className="subheading"><span className="headingSpan">Username:</span></h5>
                  <p className="stateUser">{this.state.user.username}</p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading"><span className="headingSpan">Bio:</span></h5>
                  <p className="stateUser">{this.state.user.bio}</p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading"><span className="headingSpan">Name:</span></h5>
                  <p className="stateUser">{this.state.user.first_name} {this.state.user.middle_initial}{" "}
                  {this.state.user.last_name}</p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading"><span className="headingSpan">Telephone:</span></h5>
                  <p className="stateUser">{this.state.user.telephone}</p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading"><span className="headingSpan">Email:</span></h5>
                  <p className="stateUser">{this.state.user.email}</p>
                </li>
              </ul>
              <div className="card-body">
                <Link to="/users/edit" className="btn clickable">
                  Edit Profile
                </Link>
              </div>
            </div>

            <h3 className="eventListingHeader">You've RSVPed to:</h3>
            <div className="row">
              {events}
            </div>

            <h3 className="eventListingHeader">Your groups:</h3>
            <div className="row">
              {groups}
            </div>
          </div>
        </Fragment>
      );
    } else return <div>Loading...</div>;
  }
}

export default UserDetailScreen;
