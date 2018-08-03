import React, { Component, Fragment } from "react";
import * as usersService from "../../../services/users";
import { Link } from "react-router-dom";

class UserDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.userId = props.match.params.id;

    this.state = {
      user: []
    };
  }

  async componentDidMount() {
    try {
      let user = await usersService.one(this.userId);
      if (!user.profile_picture_image)
        user.profile_picture_image = `/images/default_user_image.png`;
      this.setState({ user });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.user) {
      let groups, events;
      if (this.state.user.groups) {
        groups = this.state.user.groups.map(group => {
          return <li>{group.name}</li>;
        });
      } else groups = <li>None</li>;
      if (this.state.user.events) {
        events = this.state.user.events.map(event => {
          return <li>{event.name}</li>;
        });
      } else events = <li>None</li>;
      return (
        <Fragment>
          <div className="container p-5">
            <h1>Your Profile:</h1>
            <div className="card">
              <img
                className="card-img-top"
                src={this.state.user.profile_picture_image}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{this.state.user.username}</h5>
                <p className="card-text">{this.state.user.bio}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {this.state.user.first_name} {this.state.user.middle_initial}{" "}
                  {this.state.user.last_name}
                </li>
                <li className="list-group-item">{this.state.user.telephone}</li>
                <li className="list-group-item">{this.state.user.email}</li>
              </ul>
              <div className="card-body">
                <Link to="/users/edit" className="btn btn-primary">
                  Edit Profile
                </Link>
              </div>
            </div>

            <h1>Your RSVPed Events:</h1>
            <div className="card">
              <ul className="list-group list-group-flush">{groups}</ul>
            </div>

            <h1>Your Groups:</h1>
            <div className="card">
              <ul className="list-group list-group-flush">{events}</ul>
            </div>
          </div>
        </Fragment>
      );
    } else return <div>Loading...</div>;
  }
}

export default UserDetailScreen;
