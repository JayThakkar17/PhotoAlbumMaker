import axios from 'axios';

export function LoginService(params) {
    return axios.post(
        'http://localhost:8000/api/signin',
        params
    );
}

export function SignupService(params) {
    return axios.post(
        'http://localhost:8000/api/signup',
        params
    );
}

export function LogOutService(params) {
    return axios.get(
        'http://localhost:8000/api/signout',
        params
    );
}

export function str2bool(value) {
    if (value && typeof value === 'string') {
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
    }
    return value;
}

export function isObjectEmpty(object) {
    return Object.getOwnPropertyNames(object).length === 0;
}

export function authToken() {
    return localStorage.getItem('AUTH_TOKEN');
}

export function email() {
    return localStorage.getItem('Email');
}

export function name() {
    return localStorage.getItem('Name').replace(/['"]+/g, '');
}

export function userId() {
    return localStorage.getItem('User_id').replace(/['"]+/g, '');
}

export function isLoggedIn() {
    if (authToken()) {
        return true;
    } else {
        return false;
    }
}

export function currentUserRole() {
    return JSON.parse(localStorage.getItem('ROLE'));
}

export function apiHeader() {
    return {
        headers: apiCustomHeader()
    };
}

export function apiCustomHeader() {
    return {
        Authorization: 'Bearer ' + authToken(),
        'Content-Type': 'application/json'
    };
}