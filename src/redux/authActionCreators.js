import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}
export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg,
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }

    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const API_KEY = "AIzaSyA48cq1wCUHUwitIIfO5cx_nqc_1lqtD_A";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            //console.log(response);
            dispatch(authLoading(false));
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
        .catch(err => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message));
        })
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}
export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        //log Out
        dispatch(logout());
    }
    else {
        const expirationTime = localStorage.getItem('expirationTime');
        if (expirationTime <= new Date()) {
            //log out
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}
