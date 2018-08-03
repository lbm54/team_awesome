import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import { postCharge } from "../services/stripeService";
import CardSection from "./cardSection";

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
      await postCharge({ id: token.token.id, amount: 10 }); //10 is hard coded but you will need an input form
      console.log(this.props);
      window.location.href = '/events';
    } catch (e) {
      console.log(e);
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
            <h4>Amount is: $10</h4>
            <button className="btn btn-primary">SUBMIT</button>
          </div>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm); //injectstripe is wrapping checkoutform
