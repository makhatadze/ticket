import axios from "axios";
import {
    CLEAR_USERS_SEARCH_QUERY,
    CLOSE_USERS_FORM,
    GET_USERS,
    SET_USERS_LOADING,
    SET_USERS_SEARCH_QUERY,
    SHOW_USERS_FORM
} from "./userTypes";


const url = process.env.MIX_SERVER_API_URL;

// Get users
export const getUsers = () => (dispatch, getState) => {
    dispatch(setUsersLoading());
    const {searchQuery} = getState().users
    axios
        .get(`${url}/user${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_USERS,
                payload: {}
            })
        )
}

// Get user by ip.
export const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/user/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Create new user
export const createUser = data => (dispatch,getState) => {
    const {searchQuery} = getState().users;
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/ip-restriction`,data)
            .then(res => {
                searchQuery === '' ? getUsers() : dispatch(clearUserSearchQuery())
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// Update user
export const updateUser = (id,data) => {
    return new Promise(async (resolve,reject) => {
        axios.patch(`${url}/user/${id}`,data)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Set users loading
export const setUsersLoading = () => {
    return {
        type: SET_USERS_LOADING
    }
}

// Clear users SearchQuery
export const clearUserSearchQuery = () => {
    return {
        type: CLEAR_USERS_SEARCH_QUERY
    }
}

// Show user Form
export const showUserForm = (data = {}) => {
    return {
        type: SHOW_USERS_FORM,
        payload: data
    }
}

// Close user Form
export const closeUserForm = () => {
    return {
        type: CLOSE_USERS_FORM
    }
}

// Set Search query
export const setUserSearchQuery = (payload = {}) => {
    return {
        type: SET_USERS_SEARCH_QUERY,
        payload
    }
}
