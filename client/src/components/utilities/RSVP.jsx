import React, { Component } from 'react';
import { sendRSVP } from '../services/RSVP';

export default class RSVP extends Component {
    constructor(props) {
        super(props);
    }

    // This handle func should send the email and then alert the user

    handleSubmit(e) {
        e.preventDefault();
        sendRSVP()
            .then(() => {
                return (
                    <div class="alert alert-info" role="alert">
                        Great! We've let your host know!  
                    </div>
                )
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <Fragment>
                <button className="btn btn-primary" onClick={this.handleSubmit(e)}> RSVP </button>
            </Fragment>
        );
    }

}