import React, { Component } from 'react';
import { sendRSVP } from '../services/RSVP';
import rsvpModal from './rsvpmodal';
export default class RSVP extends Component {
    constructor(props) {
        super(props);
    }

    // This handle func should send the email and then alert the user

    handleSubmit(e) {
        e.preventDefault();
        sendRSVP()
            .then(() => {
                <rsvpModal />
            }).catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <Fragment>
                <button className="btn btn-primary" onClick={this.handleSubmit(e)}> RSVP to this event! </button>
            </Fragment>
        );
    }

}