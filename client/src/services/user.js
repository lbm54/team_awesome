import * as baseService from './base';

let loggedIn = false;
let user;

function isLoggedIn() {
    return loggedIn;
}

function getUserId() {
    if (user) return user.id;
    else return "-1";
}

async function checkLogin() {
    if (loggedIn) {
        return true;
    } else {
        baseService.populateAuthToken();
        try {
            user = await me();
            loggedIn = true;
            return true;
        } catch (e) {
            return false;
        }
    }
}

async function login(email, password) {
    let response = await baseService.makeFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    if (response.ok) {
        let json = await response.json();
        baseService.setAuthToken(json.token);
        loggedIn = true;
    } else if (response.status === 401) {
        let json = await response.json();
        throw json;
    }
}

function logout() {
    baseService.clearAuthToken();
    loggedIn = false;
}

function me() {
    return baseService.get('/api/users/me');
}

export { isLoggedIn, checkLogin, login, logout, getUserId };
