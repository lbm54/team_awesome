import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';

export default class RSVPModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <h4>Looks like this event has a cover charge.</h4>
          <p>Would you like to go ahead and pay now?</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/cardservices">
            <Button bsStyle="info">Pay</Button>
          </Link>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
