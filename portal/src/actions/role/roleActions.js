import axios from 'axios'

const url = process.env.MIX_SERVER_API_URL;

import {CLEAR_ROLE_SEARCH_QUERY, CLOSE_ROLE_FORM, GET_ROLES, SET_ROLES_LOADING, SHOW_ROLE_FORM} from "./roleTypes";

// Get Roles
export const getRoles = () => (dispatch, getState) => {
    dispatch(setRolesLoading());
    const {searchQuery} = getState().roles
    axios
        .get(`${url}/role${searchQuery}`)
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

// Create new role
export const createRole = data => (dispatch,getState) => {
    const {searchQuery} = getState().roles;
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/role`, data)
            .then(res => {
                searchQuery === '' ? dispatch(getRoles()) : dispatch(clearRoleSearchQuery())
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

// Clear role searchQuery
export const clearRoleSearchQuery = () => {
    return {
        type: CLEAR_ROLE_SEARCH_QUERY
    }
}

// Show role (create,update) form.
export const showRoleForm = (payload = {}) => {
    return {
        type: SHOW_ROLE_FORM,
        payload
    }
}

// Close role (create,update) form.
export const closeRoleForm = () => {
    return {
        type: CLOSE_ROLE_FORM
    }
}