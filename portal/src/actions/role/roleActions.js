import axios from 'axios'

const url = process.env.MIX_SERVER_API_URL;

import {GET_ROLES, SET_ROLES_LOADING} from "./roleTypes";

// Get Roles
export const getRoles = (query = '') => dispatch => {
    dispatch(setRolesLoading());
    axios
        .get(`${url}/role${query}`)
        .then(res =>
            dispatch({
                type: GET_ROLES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ROLES,
                payload: {}
            })
        );
};

// Set Roles loading
export const setRolesLoading = () => {
    return {
        type: SET_ROLES_LOADING
    };
};