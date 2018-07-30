import stripeLoader from 'stripe';
const stripe = stripeLoader(process.env.STRIPE_SK);  // I think we did this differently

function charge(tokemn, amt) {
    return stripe.charges.create({
        amount: amt * 100, //amount in cents
        currency: 'usd',
        source: token,
        description: 'Statement description'
    });
};

export { charge }