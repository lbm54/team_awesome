import * as baseService from './base';


function sendRSVP(name, email, message){
    return baseService.post('/api/contact', {
        name,
        email,
        message
    });
}

export { sendRSVP };