import React, { Component, Fragment } from "react";
import { sendRSVP } from "../../services/RSVP";
import RSVPModal from "./rsvpmodal";
import {Alert} from 'react-bootstrap';

export default class RSVP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showAlert: false
    };
  }

  // This handle func should send the email and then alert the user

  handleSubmit(e) {
    e.preventDefault();
    sendRSVP()
      .then(() => {
        // let's show the modal
        this.setState({ showAlert: true });
        // this.setState({showModal: true});
        // <rsvpModal />
      })
      .catch(err => {
        console.log(err);
      });
  }

  closeAlert(event) {
    // close the alert
    // If theres a cover charge
    this.setState({
      showAlert: false,
      showModal: true
    });
  }

  render() {
    return (
      <Fragment>
        {/* <Button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>
          {" "}
          RSVP to this event!{" "}
        </Button>
        <Alert
          showalert={}
          onClick={(e) => this.closeAlert(e)}
        />
        <RSVPModal showModal={this.state.showModal} /> */}
      </Fragment>
    );
  }
}
