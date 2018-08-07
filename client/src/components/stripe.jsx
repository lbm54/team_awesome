import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './checkoutForm'; // must be a child of Elements wrapper
import * as eventsService from '../services/events';
import { NotificationManager } from "react-notifications";

class Donate extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            event: {}
        }
    }

    async componentDidMount() {
        let eventId = this.props.match.params.eventId;
        let event = await eventsService.one(eventId);
        this.setState({event: event});
    }

    render() {
        return (
            <StripeProvider apiKey="pk_test_XmKmh2yfDY1kxH8fsOev42VY">
                <Elements> 
                    <InjectedCheckoutForm event={this.state.event} />
                </Elements>
            </StripeProvider>
        );
    }

}

export default Donate;
