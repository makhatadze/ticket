import axios from 'axios'

const url = process.env.MIX_SERVER_API_URL;

import {
    CLEAR_ROLE_SEARCH_QUERY,
    CLOSE_ROLE_FORM, CLOSE_ROLE_VIEW,
    GET_ROLES,
    SET_ROLES_LOADING,
    SET_UPDATED_ROLE,
    SHOW_ROLE_FORM, SHOW_ROLE_VIEW
} from "./roleTypes";

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

// Get role by id
export const getRoleByIp = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/role/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}


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

// Update ip restriction
export const updateRole = (id,data) => {
    return new Promise(async (resolve,reject) => {
        axios.patch(`${url}/role/${id}`,data)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Merge updated ip restriction.
export const setUpdateRole = (payload) => {
    return {
        type: SET_UPDATED_ROLE,
        payload
    }
}


// Set Roles loading
export const setRolesLoading = () => {
    return {
        type: SET_ROLES_LOADING
    };
};

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

// Show role view
export const showRoleView = (payload) => {
    return {
        type: SHOW_ROLE_VIEW,
        payload
    }
}
// Close role view
export const closeRoleView = () => {
    return {
        type: CLOSE_ROLE_VIEW
    }
}