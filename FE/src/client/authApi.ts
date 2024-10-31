import axios from "axios";
import { appConfig } from "../appConfig";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../models/UserModel";
// import jwtDecode from "jwt-decode"; // Fix import statement

// Create Axios instance with default headers (like in vacationsApi.ts)
const api = axios.create({
    baseURL: appConfig.url,
    headers: {
        'Content-Type': 'application/json',
        'doormanKey': 'GZs7Y!82b@kF%9Rlz3xJp#4Q^nWcVmA&dThUo',
    }
});

export async function register(firstName: string, lastName: string, email: string, password: string) {
    const url = `/auth/register`;

    const data = {
        firstName,
        lastName,
        email,
        password,
    };

    const res = await api.post(url, data); // Use Axios instance `api` instead of `axios.post`
    const token = res.data.token;

    localStorage.setItem("token", token);

    const decodedToken = jwtDecode<UserModel>(token);
    return decodedToken;
}

export async function login(email: string, password: string) {
    const url = `/auth/login`;

    const data = {
        email,
        password,
    };

    const res = await api.post(url, data); // Use Axios instance `api` instead of `axios.post`
    const token = res.data.token;
    localStorage.setItem("token", token);

    const decodedToken = jwtDecode<UserModel>(token);    
    return decodedToken;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getUserDetails() {
    const token = getToken();
    if (token) {
        return jwtDecode<UserModel>(token); // Decode token to get user details
    }
    return null;
}

export function logout() {
    localStorage.removeItem("token");
}