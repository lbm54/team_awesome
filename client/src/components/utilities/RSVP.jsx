import React, { Component } from 'react';
import { sendRSVP } from '../services/RSVP';
import StripeCharge from './StripeCharge';
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
                // Start Strip int.
                // show button that routes to card page if coverchage = yes 
                // I need to write the covercharge func but honestly i'm not sure how to do that
                
                // .then(() => {
                //     {hasCoverCharge === 1 ? (
                //        <Fragment>
                //         <h2> Looks like there's a cover charge. </h2>
                //         <Link to="/cardservices">
                //         {/* The button should link to the card screen */}
                //         <button type="button" class="btn btn-success coverChargeBtn">Pay now</button>
                //             </Link>
                //         </Fragment>
                //     ) : (null)}
                // })
            }).catch((err) => {
                console.log(err);
            });
    }

    //but honestly, yall, I'm going to turn this into a modal. I think it's too complex
    // I forsee a nondismissable loop error in this, so I'll just build a dismissable modal that
    // pops up when the rsvp button is clicked. 
    

    render() {
        return (
            <Fragment>
                <button className="btn btn-primary" onClick={this.handleSubmit(e)}> RSVP to this event! </button>
            </Fragment>
        );
    }

}