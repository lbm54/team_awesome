import React, { Component } from "react";
import DateTimePicker from "../../datetimepicker";
import TagList from "../../taglist";
import AutoComplete from "../../autocomplete";
import FileUpload from '../../fileupload';
class EventCreateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start_time: "",
      end_time: "",
      location_name: "",
      address_line_one: "",
      address_line_two: "",
      city: "",
      state: "",
      zip: "",
      name: "",
      thumbnail_image_link: "",
      tags: [],
      locations: [],
      selectedTags: []
    };

    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleLocationName = this.handleLocationName.bind(this);
    this.handleAddressOne = this.handleAddressOne.bind(this);
    this.handleAddressTwo = this.handleAddressTwo.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleThumbnailImageLink = this.handleThumbnailImageLink.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  handleStartTime(value) {
    this.setState({ start_time: value });
  }

  handleEndTime(value) {
    this.setState({ end_time: value });
  }

  handleLocationName(value) {
    this.setState({ location_name: value });
    console.log(value);
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
    this.setState({ start_time: value });
  }

  handleName(value) {
    this.setState({ name: value });
  }

  handleThumbnailImageLink(value) {
    this.setState({ thumbnail_image_link: value });
  }

  handleTags(value) {
    this.setState({ selectedTags: this.state.selectedTags.concat([value]) });
  }

  handleSubmit(value) {
    fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(value),
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
          <h1>Create an Event</h1>
          <div className="form-group">
            <label htmlFor="startTime">Start Time: </label>
            <DateTimePicker
              className="form-control"
              onChange={this.handleStartTime}
              name="startTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime">End Time: </label>
            <DateTimePicker
              className="form-control"
              onChange={this.handleEndTime}
              name="endTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationName">Choose a location:</label>
            <AutoComplete
              onChange={this.handleLocationName}
              name="locationName"
              className="form-control"
              source={this.state.locations}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressLineOne">Address Line One:</label>
            <input
              value={this.state.address_line_one}
              onChange={event => this.handleAddressOne(event.target.value)}
              className="form-control"
              name="addressLineOne"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLineTwo">Address Line Two:</label>
            <input
              value={this.state.address_line_two}
              onChange={event => this.handleAddressTwo(event.target.value)}
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
            <label htmlFor="state">State:</label>
            <input
              value={this.state.state}
              onChange={event => this.handleState(event.target.value)}
              className="form-control"
              name="state"
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
            <label htmlFor="name">Name:</label>
            <input
              value={this.state.name}
              onChange={event => this.handleName(event.target.value)}
              className="form-control"
              name="name"
            />
          </div>
          {/* <input
            value={this.state.thumbnail_image_link}
            onChange={event =>
              this.handleThumbnailImageLink(event.target.value)
            }
          /> */}

          <h5>Upload profile image</h5>
          <FileUpload label="Upload Event Thumbnail" />

          <div className="form-group">
            <label htmlFor="tags">Choose your tags:</label>
            <AutoComplete
              onChange={this.handleTags}
              name="tags"
              className="form-control"
              source={this.state.tags}
            />
            <TagList selectedTags={this.state.selectedTags} />
          </div>

          <button onClick={event => this.handleSubmit(this.state)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EventCreateScreen;
