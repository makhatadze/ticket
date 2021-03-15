import axios from "axios";
import setAuthToken from "../../core/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {SET_AUTH_ERRORS, SET_USER} from "./authTypes";
import isEmpty from "../../core/validation/is-empty";

// Login - Get User Token
export const loginUser = userData => dispatch => {
    return new Promise( async (resolve, reject) => {
        axios
            .post('http://127.0.0.1:8000/api/v1/auth/login', userData)
            .then(res => {
                // Save to localStorage
                const {token} = res.data;
                // Set token to ls
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header
                setAuthToken(token);
                // Decode token to get user data
                const decoded = jwt_decode(token);
                // Set current user
                dispatch(setUser(decoded));
                resolve('You log in successfully')
            })
            .catch(err => {
                if (isEmpty(err.response.data.errors)) {
                    reject(err.response.data.error)
                } else {
                    dispatch({
                        type: SET_AUTH_ERRORS,
                        payload: JSON.parse(err.response.data.errors)
                    })
                    reject('Validation error')
                }
            });
    })

};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setUser({}));
};

// Set logged in user
export const setUser = decoded => {
    return {
        type: SET_USER,
        payload: decoded
    };
};