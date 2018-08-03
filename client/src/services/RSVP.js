import * as baseService from './base';


function sendRSVP(name, email, message){
    return baseService.post('/api/rsvp', {
        name,
        email,
        message
    });
}

export { sendRSVP };