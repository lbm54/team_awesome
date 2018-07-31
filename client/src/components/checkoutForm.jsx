import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import { postCharge } from '../services/stripeService';

import CardSection from './cardSection';


class CheckoutForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            customerName: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.stripe.createToke({name: this.state.customerName })
        .then(({token}) => {
            // TODO: go in to remove hard code of "$10" and have it be set by createEvent covercharge props
            postCharge({ id: token.id, amount: 10});
        })
        .catche((err) => {
            console.log(err)
        });
    }
        handleNameInput(e) {
            this.setState({ customerName: e.target.value });
        };

    //     render(){
    //         return {
    //             <form onSubmit={ (e) => this.handleSubmit(e)} >
    //                 <input onChange={ (e) => this.handleNameInput(e)} placeholder="name" htmlFor="name" id="name" />
    //                 <CardSection />
    //                 <button> Submit </button>
    //             </form>
    //         };
    //     }
    }


    export default injectStripe(CheckoutForm);