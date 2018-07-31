import React, { Component } from 'react';


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
            <div class="alert alert-info alert-dismissible fade show" role="alert">
            <p>We let your host know to expect you. </p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" />
            </div>
        ).then(() => {
            {
                hasCoverCharge === 1 ? (
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Body>
                            <h4>Looks like this event has a cover charge.</h4>
                            <p>
                                Would you like to go ahead and pay now?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to="/cardservices">
                                <Button bsStyle="info">Pay</Button>
                            </Link>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                </Modal> ) : ( null); }
        }
        )}
};