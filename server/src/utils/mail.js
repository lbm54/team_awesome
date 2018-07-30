import mailgunLoader from 'mailgun-js';
let mailgun = mailgunLoader({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: 'sandbox5906cbd631dd4ba4b5ab3a368e4086c2.mailgun.org'
});

function sendEmail(to, from, subject, content){
    let data = {
        from,
        to,
        subject,
        html: content
    };

    return mailgun.message().send(data);

}

export { sendEmail };