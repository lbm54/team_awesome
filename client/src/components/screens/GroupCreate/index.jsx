import React, { Component } from "react";
import DateTimePicker from "../../datetimepicker";
import AutoComplete from "../../autocomplete";
import FileUpload from "../../fileupload";
import TagList from "../../taglist";
import states from '../../../services/states';
import SelectMenu from '../../selectmenu';

class GroupCreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regular_event_start_time: "",
      regular_event_end_time: "",
      regular_event_day_of_week: "",
      name: "",
      host_user_id: "",
      location_id: "",
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
      showNewDiv: "none",
      selectedTags: [],
      locations: [],
      tags: []
    };

    this.handleRegularEventStartTime = this.handleRegularEventStartTime.bind(this);
    this.handleRegularEventEndTime = this.handleRegularEventEndTime.bind(this);
    this.handleRegularEventDayOfWeek = this.handleRegularEventDayOfWeek.bind(this);
    this.handleLocationId = this.handleLocationId.bind(this);
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

  handleLocationId(value) {
    this.setState({ location_id: value.id });
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

  handleSubmit(event) {
    event.preventDefault();
    let object = {
      regular_event_start_time: this.state.reular_event_start_time,
      regular_event_end_time: this.state.regular_event_end_time,
      regular_event_day_of_week: this.state.regular_event_day_of_week,
      name: this.state.name,
      details: this.state.details,
      blurb: this.state.blurb,
      tags: this.state.selectedTags,
      thumbnail_image_link: this.state.thumbnail_image_link
    };
    if (this.state.location_id) {
      object["location_id"] = this.state.location_id;
    } else {
      object["address_line_one"] = this.state.address_line_one;
      object["address_line_two"] = this.state.address_line_two;
      object["city"] = this.state.city;
      object["zip"] = this.state.zip;
    }
    fetch("/api/Groups", {
      method: "POST",
      body: JSON.stringify(object),
      headers: new Headers({ "Content-Type": "application/json" })
    });
  }

  componentDidMount() {
    try {
      fetch("/api/locations")
        .then(response => response.json())
        .then(locations => {
          this.setState({ locations });
        });
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
          <h1>Create a Group</h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              value={this.state.name}
              type="text"
              onChange={event => this.handleName(event.target.value)}
              className="form-control"
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Blurb:</label>
            <input
              value={this.state.blurb}
              type="text"
              onChange={event => this.handleBlurb(event.target.value)}
              className="form-control"
              name="blurb"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Details:</label>
            <textarea
              value={this.state.details}
              cols="30"
              rows="10"
              onChange={event => this.handleDetails(event.target.value)}
              className="form-control"
              name="details"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startTime">Regular Event Start Time: </label>
            <DateTimePicker
              className="form-control"
              onChange={this.handleRegularEventStartTime}
              name="startTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime">Regular Event End Time: </label>
            <DateTimePicker
              className="form-control"
              onChange={this.handleRegularEventEndTime}
              name="endTime"
            />
          </div>

          <div className="form-group">
              <label htmlFor="state" className="mr-2">Regular Event Day of Week:</label>
              <SelectMenu
                value={this.state.regular_event_day_of_week}
                source={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                callback={event => this.handleRegularEventDayOfWeek(event.target.value)}
                className="form-control"
                id="state"
              />
            </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="locationName" className="mr-2">
                  Choose a location:
                </label>
                <AutoComplete
                  callback={this.handleLocationId}
                  id="locationsSelect"
                  source={this.state.locations}
                />
              </div>
            </div>
            <div className="col mt-0">
              <button
                className="btn btn-primary"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showNewDiv: "block" });
                }}
              >
                New Location
              </button>
            </div>
          </div>

          {/*************** new location div ***************************/}
          <div style={{ display: this.state.showNewDiv }}>
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
              <label htmlFor="state" className="mr-2">State:</label>
              <SelectMenu
                value={this.state.state}
                source={states.getStates()}
                callback={event => this.handleState(event.target.value)}
                className="form-control"
                id="state"
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
          </div>

          {/************** file upload ***************/}
          <h5>Upload Group image</h5>
          <FileUpload label="Upload Group Thumbnail" callback={this.handleThumbnailImageLink} />

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
          <button onClick={event => this.handleSubmit(event)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default GroupCreateScreen;
