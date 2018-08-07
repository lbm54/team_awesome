import React, { Component, Fragment } from "react";
import * as usersService from "../../../services/users";
import states from "../../../services/states";
import SelectMenu from "../../selectmenu";
import { NotificationManager } from "react-notifications";
import FileUpload from "../../fileupload";

class UsersEditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      address_line_one: "",
      address_line_two: "",
      city: "",
      state: "",
      zip: "",
      first_name: "",
      middle_initial: "",
      last_name: "",
      profile_picture_link: "",
      telephone: "",
      bio: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleAddressLineOne = this.handleAddressLineOne.bind(this);
    this.handleAddressLineTwo = this.handleAddressLineTwo.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleMiddleInitial = this.handleMiddleInitial.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleProfilePictureLink = this.handleProfilePictureLink.bind(this);
    this.handleTelephone = this.handleTelephone.bind(this);
    this.handleBio = this.handleBio.bind(this);
  }

  async componentDidMount() {
    try {
      this.userId = this.props.match.params.userId;
      let user = await usersService.one(this.userId);
      this.setState({
        email: user.email,
        username: user.username,
        address_line_one: user.location.address_line_one,
        address_line_two: user.location.address_line_two,
        city: user.location.city,
        state: user.location.state,
        zip: user.location.zip,
        first_name: user.first_name,
        middle_initial: user.middle_initial,
        last_name: user.last_name,
        profile_picture_link: user.profile_picture_link,
        telephone: user.telephone,
        bio: user.bio
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleEmail(value) {
    this.setState({ email: value });
  }

  handleUsername(value) {
    this.setState({ username: value });
  }

  handleFirstName(value) {
    this.setState({ first_name: value });
  }

  handleMiddleInitial(value) {
    this.setState({ middle_initial: value });
  }

  handleLastName(value) {
    this.setState({ last_name: value });
  }

  handleProfilePictureLink(value) {
    this.setState({ profile_picture_link: value });
  }

  handleTelephone(value) {
    this.setState({ telephone: value });
  }

  handleAddressLineOne(value) {
    this.setState({ address_line_one: value });
  }

  handleAddressLineTwo(value) {
    this.setState({ address_line_two: value });
  }

  handleCity(value) {
    this.setState({ city: value });
  }

  handleBio(value) {
    this.setState({ bio: value });
  }

  handleState(value) {
    this.setState({ state: value });
  }

  handleZip(value) {
    this.setState({ zip: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let location = {
      address_line_one: this.state.address_line_one,
      address_line_two: this.state.address_line_two,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    }
    let object = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      middle_initial: this.state.middle_initial,
      email: this.state.email,
      bio: this.state.bio,
      telephone: this.state.telephone,
      profile_picture_link: this.state.profile_picture_link,
      location: location
    };

    try {
      fetch(`/api/users/${this.userId}`, {
        method: "PUT",
        body: JSON.stringify(object),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      NotificationManager.success("User Edited!");
      this.props.history.push(`/users/profile`);
    } catch (err) {
      NotificationManager.error("User Not Edited");
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container">
        <form>
          <h1>Start an account</h1>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              value={this.state.username}
              onChange={event => this.handleUsername(event.target.value)}
              className="form-control"
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Email:</label>
            <input
              value={this.state.email}
              onChange={event => this.handleEmail(event.target.value)}
              className="form-control"
              name="email"
              type="email"
            />
          </div>

          <div>
            <label htmlFor="addressLineOne">Address Line One:</label>
            <input
              value={this.state.address_line_one}
              onChange={event => this.handleAddressLineOne(event.target.value)}
              className="form-control"
              name="addressLineOne"
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressLineTwo">Address Line Two:</label>
            <input
              value={this.state.address_line_two}
              onChange={event => this.handleAddressLineTwo(event.target.value)}
              className="form-control"
              name="addressLineTwo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              value={this.state.city}
              onChange={event => this.handleCity(event.target.value)}
              className="form-control"
              name="city"
            />
          </div>

          <div className="form-group">
            <label htmlFor="state" className="mr-2">
              State:
            </label>
            <SelectMenu
              value={this.state.state}
              source={states.getStates()}
              callback={value => this.handleState(value)}
              className="form-control"
              id="stateUserEdit"
            />
          </div>

          <div className="form-group">
            <label htmlFor="zip">Zip:</label>
            <input
              value={this.state.zip}
              onChange={event => this.handleZip(event.target.value)}
              className="form-control"
              name="zip"
            />
          </div>

          <div className="form-group">
            <label htmlFor="first_name">First name:</label>
            <input
              value={this.state.first_name}
              onChange={event => this.handleFirstName(event.target.value)}
              className="form-control"
              name="first_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="middle_initial">Middle Initial:</label>
            <input
              value={this.state.middle_initial}
              onChange={event => this.handleMiddleInitial(event.target.value)}
              className="form-control"
              name="middle_initial"
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last name:</label>
            <input
              value={this.state.last_name}
              onChange={event => this.handleLastName(event.target.value)}
              className="form-control"
              name="last_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telephone">Telephone:</label>
            <input
              value={this.state.telephone}
              onChange={event => this.handleTelephone(event.target.value)}
              className="form-control"
              name="telephone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Tell us about yourself:</label>
            <input
              value={this.state.bio}
              onChange={event => this.handleBio(event.target.value)}
              className="form-control"
              name="bio"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePictureLink">
              Your profile picture link:
            </label>
            <input
              value={this.state.profile_picture_link}
              disabled
              onChange={event =>
                this.handleProfilePictureLink(event.target.value)
              }
              className="form-control"
              name="profilePictureLink"
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-info"
              onClick={e => {
                e.preventDefault();
                $("#profileImageDiv").toggle();
              }}
            >
              Change Profile Image
            </button>

            <div
              id="profileImageDiv"
              style={{ display: "none" }}
              className="mt-3"
            >
              <h5>Upload your profile image</h5>
              <FileUpload
                label="Upload Event Thumbnail"
                callback={this.handleProfilePictureLink}
                placeholder={this.profile_picture_link}
              />
            </div>
          </div>

          <button
            className="btn btn-primary mt-2"
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default UsersEditScreen;
