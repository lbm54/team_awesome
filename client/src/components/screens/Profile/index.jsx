import React, { Component, Fragment } from "react";
import * as usersService from "../../../services/users";
import { Link } from "react-router-dom";
import { me } from "../../../services/user";
import { NotificationManager } from "react-notifications";

class UserDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    };

    this.handleLeaveGroup = async groupId => {
      try {
        let user = await me();
        let user_id = user.id;
        let object = {
          user_id,
          group_id: groupId
        };
        fetch("/api/users/removeFromGroup", {
          method: "POST",
          body: JSON.stringify(object),
          headers: new Headers({ "Content-Type": "application/json" })
        });
        NotificationManager.success(`Left group`);
        this.load();
      } catch (err) {
        NotificationManager.error(`Failed to leave group`);
        console.log(err);
      }
    };

    this.load = async () => {
      try {
        let userRaw = await me();
        let userId = userRaw.id;
        let user = await usersService.one(userId);
        if (!user.profile_picture_link)
          user.profile_picture_link = `/images/default_user_img.png`;
        this.setState({ user });
      } catch (e) {
        console.log(e);
      }
    };
  }

  async componentDidMount() {
    this.load();
  }

  render() {
    if (this.state.user) {
      let userId = this.state.user.id;
      let profileEditLink = `/users/profileEdit/${userId}`;
      let events, groups;
      if (this.state.user.groups && this.state.user.groups[0]) {
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
                <button
                  className="ml-3 btn btn-success"
                  onClick={event => this.handleLeaveGroup(group.id)}
                >
                  Leave this Group
                </button>
              </div>
            </div>
          );
        });
      } else {
        groups = <h6 className="ml-5">None</h6>;
      }
      if (this.state.user.events && this.state.user.events[0]) {
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
      } else {
        events = <h6 className="ml-5">None</h6>;
      }
      let name = (this.state.user.first_name) ? `${this.state.user.first_name} ${this.state.user.middle_initial} ${this.state.last_name}` : "None";
      return (
        <Fragment>
          <div className="container p-5 userBioContainer">
            <h1 className="welcomeUser p-2">
              Welcome, {(this.state.user.first_name) ? this.state.user.first_name : "user"}!
            </h1>
            <div className="userImageContainer">
              <img
                className="featuredImage rounded"
                src={this.state.user.profile_picture_link}
                alt="Card image cap"
              />
            </div>
            <div className="eventCard">
              <ul className="list-group list-group-flush">
                <li className="list-group-item userAbout">
                  <h5 className="subheading">
                    <span className="headingSpan">Username:</span>
                  </h5>
                  <p className="stateUser">{(this.state.user.username) ? this.state.user.username : "None"}</p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading">
                    <span className="headingSpan">Bio:</span>
                  </h5>
                  <p className="stateUser">{(this.state.user.bio) ? this.state.user.bio: "None"}</p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading">
                    <span className="headingSpan">Name:</span>
                  </h5>
                  <p className="stateUser">
                    {name}
                  </p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading">
                    <span className="headingSpan">Phone:</span>
                  </h5>
                  <p className="stateUser">{(this.state.user.telephone) ? this.state.user.telephone : "None"}</p>
                </li>
                <li className="list-group-item userAbout">
                  <h5 className="subheading">
                    <span className="headingSpan">Email:</span>
                  </h5>
                  <p className="stateUser">{(this.state.user.email) ? this.state.user.email : "None"}</p>
                </li>
              </ul>
              <div className="card-body">
                <Link to={profileEditLink} className="btn clickable">
                  Edit Profile
                </Link>
              </div>
            </div>

            <h3 className="eventListingHeader">You've RSVPed to:</h3>
            <div className="row">{events}</div>

            <h3 className="eventListingHeader">Your groups:</h3>
            <div className="row">{groups}</div>
          </div>
        </Fragment>
      );
    } else return <div>Loading...</div>;
  }
}

export default UserDetailScreen;
