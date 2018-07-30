import { Router } from 'express';
import { sendEmail } from '../utils/mail';

// TODO: Replace emails with props from user and grouphost

let router = Router();

router.post('/', (req, res, next) => {
    let messageBody = `Name: ${req.body.name}
                        Email: ${req.body.email}
                        Message: ${req.body.message}`;
    sendEmail('warrynevins@gmail.com', 'w.hatmaker@yahoo.com','You got an RSVP!', messageBody)
    .then((response) => {
        res.sendStatue(201);
    }).catch((err) => {
        next(err);
    });
});

export default RSVPSetup;