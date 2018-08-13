import React, { Component } from "react";
import DateTimePicker from "../../datetimepicker";
import AutoComplete from "../../autocomplete";
import FileUpload from "../../fileupload";
import TagList from "../../taglist";
import states from "../../../services/states";
import SelectMenu from "../../selectmenu";
import { giveMePosition } from "../../../services/maps";
import { NotificationManager } from "react-notifications";
import { me } from "../../../services/user";

class GroupCreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regular_event_start_time: "",
      regular_event_end_time: "",
      regular_event_day_of_week: "",
      name: "",
      host_user_id: "",
      address_line_one: "",
      address_line_two: "",
      city: "",
      state: "",
      zip: "",
      name: "",
      thumbnail_image_link: "",
      tags: [],
      selectedTags: [],
      blurb: "",
      details: "",
      selectedTags: [],
      tags: []
    };

    this.handleRegularEventStartTime = this.handleRegularEventStartTime.bind(
      this
    );
    this.handleRegularEventEndTime = this.handleRegularEventEndTime.bind(this);
    this.handleRegularEventDayOfWeek = this.handleRegularEventDayOfWeek.bind(
      this
    );
    this.handleAddressOne = this.handleAddressOne.bind(this);
    this.handleAddressTwo = this.handleAddressTwo.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleThumbnailImageLink = this.handleThumbnailImageLink.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleBlurb = this.handleBlurb.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
  }

  handleRegularEventStartTime(value) {
    this.setState({ regular_event_start_time: value });
  }

  handleRegularEventEndTime(value) {
    this.setState({ regular_event_end_time: value });
  }

  handleRegularEventDayOfWeek(value) {
    this.setState({ regular_event_day_of_week: value });
  }

  handleAddressOne(value) {
    this.setState({ address_line_one: value });
  }

  handleAddressTwo(value) {
    this.setState({ address_line_two: value });
  }

  handleCity(value) {
    this.setState({ city: value });
  }

  handleState(value) {
    this.setState({ state: value });
  }

  handleZip(value) {
    this.setState({ zip: value });
  }

  handleName(value) {
    this.setState({ name: value });
  }

  handleBlurb(value) {
    this.setState({ blurb: value });
  }

  handleDetails(value) {
    this.setState({ details: value });
  }

  handleThumbnailImageLink(value) {
    this.setState({ thumbnail_image_link: value });
    console.log(value);
  }

  handleTags(value) {
    this.setState({ selectedTags: this.state.selectedTags.concat([value]) });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let user = await me();
      let position = await giveMePosition(
        this.state.address_line_one,
        this.state.city,
        this.state.state,
        this.state.zip
      );
      let object = {
        regular_event_start_time: this.state.regular_event_start_time,
        regular_event_end_time: this.state.regular_event_end_time,
        regular_event_day_of_week: this.state.regular_event_day_of_week,
        name: this.state.name,
        details: this.state.details,
        blurb: this.state.blurb,
        tags: this.state.selectedTags,
        thumbnail_image_link: this.state.thumbnail_image_link,
        address_line_one: this.state.address_line_one,
        address_line_two: this.state.address_line_two,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        lat: position.lat,
        lng: position.lng,
        host_user_id: user.id
      };

      console.log(object);

      await fetch("/api/groups", {
        method: "POST",
        body: JSON.stringify(object),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      this.props.history.push("/groups");
      NotificationManager.success("Group Created");
    } catch (err) {
      console.log(err);
      NotificationManager.error("Group not created");
    }
  }

  componentDidMount() {
    try {
      fetch("/api/tags")
        .then(response => response.json())
        .then(tags => {
          this.setState({ tags });
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container">
        <form>
          <h1 className="eventListingHeader">Create a Group</h1>
          <div className="form-group">
            <label htmlFor="name" className="subheading">Name:</label>
            <input
              value={this.state.name}
              type="text"
              onChange={event => this.handleName(event.target.value)}
              className="form-control"
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name" className="subheading">At a Glance:</label>
            <input
              value={this.state.blurb}
              type="text"
              onChange={event => this.handleBlurb(event.target.value)}
              className="form-control"
              name="blurb"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name" className="subheading">Details:</label>
            <textarea
              value={this.state.details}
              cols="30"
              rows="10"
              resize="none"
              onChange={event => this.handleDetails(event.target.value)}
              className="form-control"
              name="details"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startTime" className="subheading">Regular Event Start Time: </label>
            <input
              value={this.state.regular_event_start_time}
              type="text"
              placeholder="e.g., 7:00"
              onChange={event =>
                this.handleRegularEventStartTime(event.target.value)
              }
              className="form-control"
              name="startTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime" className="subheading">Regular Event End Time: </label>
            <input
              value={this.state.regular_event_end_time}
              type="text"
              placeholder="e.g., 8:00"
              onChange={event =>
                this.handleRegularEventEndTime(event.target.value)
              }
              className="form-control"
              name="endTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="state" className="mr-2 subheading">
              Regular Event Day of Week:
            </label>
            <SelectMenu
              value={this.state.regular_event_day_of_week}
              source={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ]}
              callback={this.handleRegularEventDayOfWeek}
              className="form-control"
              id="state"
            />
          </div>

          {/*************** new location div ***************************/}
          <div className="form-group">
            <label htmlFor="addressLineOne">Address Line One:</label>
            <input
              value={this.state.address_line_one}
              type="text"
              onChange={event => this.handleAddressOne(event.target.value)}
              className="form-control"
              name="addressLineOne"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLineTwo">Address Line Two:</label>
            <input
              value={this.state.address_line_two}
              type="text"
              onChange={event => this.handleAddressTwo(event.target.value)}
              className="form-control"
              name="addressLineTwo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              value={this.state.city}
              type="text"
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
              id="stateGroup"
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip:</label>
            <input
              value={this.state.zip}
              type="number"
              onChange={event => this.handleZip(event.target.value)}
              className="form-control"
              name="zip"
            />
          </div>

          {/************** file upload ***************/}
          <h5>Upload Group image</h5>
          <FileUpload
            label="Upload Group Thumbnail"
            callback={this.handleThumbnailImageLink}
          />

          {/************** autocomplete tags ***************/}
          <div className="form-group">
            <label htmlFor="locationName" className="mr-2">
              Choose your tags:{" "}
            </label>
            <AutoComplete
              callback={this.handleTags}
              source={this.state.tags}
              id="tagsSelect"
            />
          </div>
          <TagList selectedTags={this.state.selectedTags} />
          <button
            className="btn clickable"
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default GroupCreateScreen;
