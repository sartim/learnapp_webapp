import config from 'config';
import { authHeader } from '../_helpers';
import {handleResponse} from "../_helpers/response-handler";
import Script from "../_helpers/script";
import io from "socket.io-client";

export const userService = {
    login,
    logout,
    register,
    getUsers,
    getOnlineUsers,
    getByIdOrEmailOrPhone,
    update,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/account/generate/jwt/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access_token) {
              // Loop through roles array & encrypt
              const roles = user.user.roles;
              let encrypted_roles = [];
              for (const role of roles) {
                  encrypted_roles.push(Script.encrypt(role));
              }
              const new_user_obj = {
                  access_token: Script.encrypt(user.access_token),
                  refresh_token: Script.encrypt(user.refresh_token),
                  user: {
                    id: Script.encrypt(user.user.id),
                    full_name: Script.encrypt(user.user.full_name),
                    email: Script.encrypt(user.user.email),
                    roles: encrypted_roles
                  }
              };
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(new_user_obj));
            }
            return user;
        });
}

function logout() {
    let namespace = '/notification';
    const socket = io.connect(`${config.apiUrl}`+namespace);
    // remove user from local storage to log user out
    socket.on('disconnect', function () {
        console.log("disconnected");
        socket.emit('user disconnect', {
            data: 'Disconnected '+ Script.decrypt(loggedin_user.user.full_name)
        });
    });
    localStorage.removeItem('user');
}

function getUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/account/user/`, requestOptions).then(handleResponse);
}

function getOnlineUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/account/user/online/`, requestOptions).then(handleResponse);
}

function getByIdOrEmailOrPhone(param) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    if (param.id)
        return fetch(`${config.apiUrl}/account/user/?id=${param.id}`, requestOptions).then(handleResponse);
    else if (param.email)
        return fetch(`${config.apiUrl}/account/user/?email=${param.email}`, requestOptions).then(handleResponse);
    else if (param.phone)
        return fetch(`${config.apiUrl}/account/user/?phone=${param.phone}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/account/user/`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
