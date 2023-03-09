const TOKEN = 'token';
const USER = 'user'

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function setUser(user) {
    let jsonUser = JSON.stringify(user);
    localStorage.setItem(USER, jsonUser);
}

export function getUser() {
    return JSON.parse(localStorage.getItem(USER));
}