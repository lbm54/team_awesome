import React, { Component } from "react";
import Datepicker from "../../datepicker";

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
      tags: []
    };

    this.handleStartTime = this.handleStartTime.bind(this);
  }

  handleStartTime(value) {
    this.setState({ start_time: value });
    console.log(value);
  }

  handleEndTime(value) {
    this.setState({ end_time: value });
  }

  handleLocationName(value) {
    this.setState({ location_name: value });
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
    this.setState({ tags: value });
  }

  handleSubmit(value) {
    fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(value),
      headers: new Headers({ "Content-Type": "application/json" })
    });
  }

  render() {
    return (
      <div>
        <form>
          {/* <input
                    value={this.state.start_time}
                    type="text"
                    id="datepickerStartTime"
                    onChange={(event) => this.handleStartTime(event.target.value)}
                    placeholder="Start Time" /> */}

          <Datepicker text="Start Time" onChange={this.handleStartTime} />

          <input
            value={this.state.end_time}
            type="text"
            id="datepickerEndTime"
            onChange={event => this.handleEndTime(event.target.value)}
            placeholder="End Time"
          />

          <input
            value={this.state.location_name}
            onChange={event => this.handleLocationName(event.target.value)}
            placeholder="Location Name"
          />

          <input
            value={this.state.address_line_one}
            onChange={event => this.handleAddressOne(event.target.value)}
            placeholder="Address Line One"
          />

          <input
            value={this.state.address_line_two}
            onChange={event => this.handleAddressTwo(event.target.value)}
            placeholder="Address Line Two"
          />

          <input
            value={this.state.city}
            onChange={event => this.handleCity(event.target.value)}
            placeholder="City"
          />

          <input
            value={this.state.state}
            onChange={event => this.handleState(event.target.value)}
            placeholder="State"
          />

          <input
            value={this.state.zip}
            onChange={event => this.handleZip(event.target.value)}
            placeholder="Zip Code"
          />

          <input
            value={this.state.name}
            onChange={event => this.handleName(event.target.value)}
            placeholder="Start Date"
          />

          <input
            value={this.state.thumbnail_image_link}
            onChange={event =>
              this.handleThumbnailImageLink(event.target.value)
            }
            placeholder="Start Date"
          />

          <input
            value={this.state.tags}
            onChange={event => this.handleTags(event.target.value)}
            placeholder="Tags"
          />

          <button onClick={event => this.handleSubmit(this.state)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EventCreateScreen;
