import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import { postCharge } from "../services/stripeService";
import CardSection from "./cardSection";
import RSVP from "../components/utilities/RSVP";
import {me} from '../services/user';
import { NotificationManager } from "react-notifications";
import {sendRSVP, addToEvent} from '../services/RSVP';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      customerName: ""
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      //injectStripe is wrapped around this so we have this.props.stripe accessible
      let token = await this.props.stripe.createToken({
        name: this.state.customerName
      });
      await postCharge({ id: token.token.id, amount: parseInt(this.props.event.cover_charge_amount) }); //10 is hard coded but you will need an input form
      NotificationManager.success("Successfully Paid");
      $("#rsvp").toggle();
    } catch (e) {
      NotificationManager.error("Failed to Pay");
      console.log(e);
    }
  }

  async handleRSVP(e) {
    e.preventDefault();

    try {
      let user = await me();
      if (user) {
        await sendRSVP(
          user.username,
          user.email,
          `${user.username} RSVPed to this event`
        );
        await addToEvent(user.id, this.props.event.id);
        NotificationManager.success("Successfully RSVPd");
        window.location = "/events";
      }
    } catch (err) {
      NotificationManager.error("Failed to RSVP");
      console.log(err);
    }
  }

  handleNameInput(e) {
    this.setState({ customerName: e.target.value });
  }

  render() {
    return (
      <div className="container fullScreen">
        <form onSubmit={e => this.handleSubmit(e)}>
          <h1>Pay Cover Charge and RSVP</h1>
          <div className="form-group">
            <input
              onChange={e => this.handleNameInput(e)}
              placeholder="Your Name"
              className="form-control"
              htmlFor="name"
              id="name"
            />
            <CardSection />
            <h4>Amount is: {this.props.event.cover_charge_amount}</h4>
            <button className="btn clickable">SUBMIT</button>
          </div>
          <button style={{display: "none"}} id="rsvp" className="btn btn-info" onClick={(e) => this.handleRSVP(e)}>RSVP</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm); //injectstripe is wrapping checkoutform
