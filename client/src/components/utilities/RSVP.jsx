import React, { Component, Fragment } from "react";
import { sendRSVP } from "../../services/RSVP";
import RSVPModal from "./rsvpmodal";

export default class RSVP extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showModal: false,
      rsvped: false
    };
  }

  // This handle func should send the email and then alert the user

  async handleSubmit(e) {
    e.preventDefault();
    if (this.props.event.has_cover_charge) {
      this.setState({ showModal: true });
    } else {
      try {
        this.setState({ rsvped: true });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    if (this.state.rsvped) {
      return (
        <Fragment>
          <button className="btn btn-secondary mx-2">
            You RSVPed to this event
          </button>
        </Fragment>
      );
    } else
      return (
        <Fragment>
          <button
            className="btn btn-info mx-2"
            onClick={e => this.handleSubmit(e)}
          >
            RSVP to this event!
          </button>
          <RSVPModal show={this.state.showModal} />
        </Fragment>
      );
  }
}
