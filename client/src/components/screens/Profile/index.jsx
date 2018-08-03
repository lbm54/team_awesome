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
<<<<<<< HEAD
          <div className="container p-5 userBioContainer">
            <h1 className="welcomeUser">Welcome, {this.state.user.first_name}!</h1>
              <img
                className="userImage rounded"
                src={this.state.user.profile_picture_link}
                alt="Card image cap"
              />
            <div className="eventCard">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h6 className="subheading">Username:</h6>
                  {this.state.user.username}
                </li>
                <li className="list-group-item">
                  <h6 className="subheading">Bio:</h6>
                  {this.state.user.bio}
                </li>
                <li className="list-group-item">
                  <h6 className="subheading">Name:</h6>
=======
          <div className="container p-5">
            <h1>Your Profile:</h1>
            <div className="eventCard">
              <img
                className="card-img-top rounded"
                src={this.state.user.profile_picture_link}
                alt="Card image cap"
              />
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h6 className="headerIndent">Username:</h6>
                  {this.state.user.username}
                </li>
                <li className="list-group-item">
                  <h6 className="headerIndent">Bio:</h6>
                  {this.state.user.bio}
                </li>
                <li className="list-group-item">
                  <h6 className="headerIndent">Name:</h6>
>>>>>>> 69203191f387f70313cc8b6049cb95484b975061
                  {this.state.user.first_name} {this.state.user.middle_initial}{" "}
                  {this.state.user.last_name}
                </li>
                <li className="list-group-item">
<<<<<<< HEAD
                  <h6 className="subheading">Telephone:</h6>
                  {this.state.user.telephone}
                </li>
                <li className="list-group-item">
                  <h6 className="subheading">Email:</h6>
=======
                  <h6 className="headerIndent">Telephone:</h6>
                  {this.state.user.telephone}
                </li>
                <li className="list-group-item">
                  <h6 className="headerIndent">Email:</h6>
>>>>>>> 69203191f387f70313cc8b6049cb95484b975061
                  {this.state.user.email}
                </li>
              </ul>
              <div className="card-body">
<<<<<<< HEAD
                <Link to="/users/edit" className="btn clickable">
=======
                <Link to="/users/edit" className="btn btn-dark">
>>>>>>> 69203191f387f70313cc8b6049cb95484b975061
                  Edit Profile
                </Link>
              </div>
            </div>

<<<<<<< HEAD
            <h3 className="eventListingHeader">You've RSVPed to:</h3>
=======
            <h1>Your RSVPed Events:</h1>
>>>>>>> 69203191f387f70313cc8b6049cb95484b975061
            <div className="row">
              {events}
            </div>

<<<<<<< HEAD
            <h3 className="eventListingHeader">Your groups:</h3>
=======
            <h1>Your Groups:</h1>
>>>>>>> 69203191f387f70313cc8b6049cb95484b975061
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
