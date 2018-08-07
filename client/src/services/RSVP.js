import * as baseService from './base';

function sendRSVP(name, email, message){
    return baseService.post('/api/rsvp', {
        name,
        email,
        message
    });
}

function addToEvent(user_id, event_id) {
    let object = {
        user_id,
        event_id
    }
    fetch('/api/users/addToEvent', {
        method: "POST",
        body: JSON.stringify(object),
        headers: new Headers({ "Content-Type": "application/json" })
    })
}

export { sendRSVP, addToEvent };