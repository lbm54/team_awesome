import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

// import InjectedCheckoutForm from './checkoutForm';

export default class StripeCharge extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <StripeProvider apiKey="pk_test_eSWMAEg654v00uxP71NjeGw1">
            <Elements>
                {/* <InjectedCheckoutForm /> */}
                <h1> Under construction </h1>
            </Elements>
            </StripeProvider>
        )
}
};