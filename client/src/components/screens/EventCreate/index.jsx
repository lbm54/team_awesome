import React, { Component } from "react";
import DateTimePicker from "../../datetimepicker";
import AutoComplete from "../../autocomplete";
import FileUpload from "../../fileupload";
import TagList from "../../taglist";
import states from "../../../services/states";
import SelectMenu from "../../selectmenu";
import { giveMePosition } from "../../../services/maps";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class EventCreateScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      start_time: "",
      end_time: "",
      address_line_one: "",
      address_line_two: "",
      location_name: "",
      city: "",
      state: "",
      zip: "",
      name: "",
      thumbnail_image_link: "",
      tags: [],
      selectedTags: [],
      blurb: "",
      details: "",
      has_cover_charge: 0,
      cover_charge_amount: ""
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
    this.handleBlurb = this.handleBlurb.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleHasCoverCharge = this.handleHasCoverCharge.bind(this);
    this.handleCoverChargeAmount = this.handleCoverChargeAmount.bind(this);
  }

  handleStartTime(value) {
    this.setState({ start_time: value });
  }

  handleCoverChargeAmount(value) {
    this.setState({ cover_charge_amount: value });
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
  }

  handleTags(value) {
    this.setState({ selectedTags: this.state.selectedTags.concat([value]) });
  }

  handleHasCoverCharge(value) {
    let val = this.state.has_cover_charge;
    this.setState({ has_cover_charge: !(val || val) });
    $("#coverChargeAmountField").toggle();
  }

  async handleSubmit(event) {
    event.preventDefault();
    let position = await giveMePosition(this.state.address_line_one, this.state.city, this.state.state, this.state.zip);
    let object = {
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      name: this.state.name,
      details: this.state.details,
      blurb: this.state.blurb,
      tags: this.state.selectedTags,
      thumbnail_image_link: this.state.thumbnail_image_link,
      has_cover_charge: this.state.has_cover_charge,
      cover_charge_amount: this.state.cover_charge_amount,
      address_line_one: this.state.address_line_one,
      address_line_two: this.state.address_line_two,
      state: this.state.state,
      city : this.state.city,
      zip : this.state.zip,
      location_name: this.state.location_name,
      lat: position.lat,
      lng: position.lng
    }
    try {
      fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(object),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      this.props.history.push("/events");
      NotificationManager.success('Event Created');
    } catch (err) {
      console.log(err);
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
          <h1>Create an Event</h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              value={this.state.name}
              onChange={event => this.handleName(event.target.value)}
              className="form-control"
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="blurb">Blurb:</label>
            <input
              value={this.state.blurb}
              onChange={event => this.handleBlurb(event.target.value)}
              className="form-control"
              name="blurb"
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">Details:</label>
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
            <label className="form-check-label mr-5" htmlFor="coverChargeCheck">
              Cover Charge?:{" "}
            </label>
            <input
              value={this.state.hasCoverCharge}
              onChange={event => this.handleHasCoverCharge(event.target.value)}
              className="form-check-input"
              name="coverChargeCheck"
              type="checkbox"
            />
          </div>

          <div
            className="form-group"
            style={{ display: "none" }}
            id="coverChargeAmountField"
          >
            <label htmlFor="cover_charge_amount">Cover Charge Amount:</label>
            <input
              value={this.state.cover_charge_amount}
              onChange={event =>
                this.handleCoverChargeAmount(event.target.value)
              }
              className="form-control"
              name="cover_charge_amount"
            />
          </div>

          {/*************** new location div ***************************/}
          <div className="form-group">
            <label htmlFor="name">Location Name:</label>
            <input
              value={this.state.location_name}
              onChange={event => this.handleLocationName(event.target.value)}
              className="form-control"
              name="name"
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
            <label htmlFor="state" className="mr-2">
              State:
            </label>
            <SelectMenu
              value={this.state.state}
              source={states.getStates()}
              callback={value => this.handleState(value)}
              className="form-control"
              id="state"
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

          {/************** file upload ***************/}
          <h5>Upload event image</h5>
          <FileUpload
            label="Upload Event Thumbnail"
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
            className="btn clickable mt-2"
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EventCreateScreen;
