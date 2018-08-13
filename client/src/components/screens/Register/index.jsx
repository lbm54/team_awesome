import React, { Component } from "react";
import FileUpload from "../../fileupload";
import states from "../../../services/states";
import SelectMenu from "../../selectmenu";
import { NotificationManager } from "react-notifications";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      email: "",
      username: "",
      password: "",
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
    this.handlePassword = this.handlePassword.bind(this);
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
  handleEmail(value) {
    this.setState({ email: value });
  }

  handleUsername(value) {
    this.setState({ username: value });
  }

  handlePassword(value) {
    this.setState({ password: value });
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
    let object = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      middle_initial: this.state.middle_initial,
      email: this.state.email,
      bio: this.state.bio,
      telephone: this.state.telephone,
      profile_picture_link: this.state.profile_picture_link,
      address_line_one : this.state.address_line_one,
      address_line_two : this.state.address_line_two,
      city : this.state.city,
      state: this.state.state,
      zip : this.state.zip
    };

    try {
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(object),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      NotificationManager.success("User Created!  Now login");
      setTimeout(() => {
        this.props.history.push('/login');
      }, 1000);
    } catch (err) {
      NotificationManager.error("User Not Created");
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
            <label htmlFor="name">Password:</label>
            <input
              value={this.state.password}
              onChange={event => this.handlePassword(event.target.value)}
              className="form-control"
              name="password"
              type="password"
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
              id="stateUser"
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
            <textarea
              value={this.state.bio}
              onChange={event => this.handleBio(event.target.value)}
              className="form-control"
              name="bio"
            />
          </div>

          {/************** file upload ***************/}
          <h5>Upload your profile image</h5>
          <FileUpload
            label="Upload Event Thumbnail"
            callback={this.handleProfilePictureLink}
          />

          <button className="btn btn-primary mt-2" onClick={event => this.handleSubmit(event)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterScreen;
