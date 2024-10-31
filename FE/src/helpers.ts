import { toast } from "react-toastify";

export function parseJwt (token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const validateEmailAndPassword = (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 4;
    if (!isEmailValid) {
        toast.error("Invalid email format.");
        return;
    }
    if (!isPasswordValid) {
        toast.error("Password must be at least 4 characters.");
        return;
    }
  };
  