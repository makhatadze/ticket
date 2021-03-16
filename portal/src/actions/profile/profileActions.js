import axios from 'axios';

import {CLEAR_CURRENT_PROFILE, GET_CURRENT_PROFILE, PROFILE_LOADING} from "./profileTypes";

const url = process.env.MIX_SERVER_API_URL;

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`${url}/auth/current-user`)
        .then(res =>
            dispatch({
                type: GET_CURRENT_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CURRENT_PROFILE,
                payload: {}
            })
        );
};

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};