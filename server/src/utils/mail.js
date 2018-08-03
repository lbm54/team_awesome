import mailgunLoader from 'mailgun-js';
import { config } from '../config';
let domain = 'sandbox53a4c0c17578431ba0bde9979ed79c47.mailgun.org';
let apiKey = config.MAILGUN_API_KEY;
let mailgun = mailgunLoader({apiKey, domain});

function sendEmail(to, from, subject, content) {
    let data = {from, to, subject, html: content};
    return mailgun.messages().send(data); //returns a promise
}

export {sendEmail};