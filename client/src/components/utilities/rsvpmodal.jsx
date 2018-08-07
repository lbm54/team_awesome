import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export default class RSVPModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.props = props;
    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ show: this.props.show });
    }
    console.log(this.state.show);
  }

  render() {
    let stripeLink = `/stripe/${this.props.eventId}`
    return (
      <Modal show={this.state.show} animation={false} onHide={this.handleClose}>
        <Modal.Body>
          <h4>Looks like this event has a cover charge.</h4>
          <p>Would you like to go ahead and pay now?</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to={stripeLink}>
            <Button bsStyle="info">Pay</Button>
          </Link>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
