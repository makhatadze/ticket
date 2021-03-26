import axios from "axios";

const url = process.env.MIX_SERVER_API_URL;

import {
    CLEAR_IP_RESTRICTION_SEARCH_QUERY, CLOSE_IP_RESTRICTION_FILTER,
    CLOSE_IP_RESTRICTION_FORM,
    CLOSE_IP_RESTRICTION_VIEW,
    GET_IP_RESTRICTIONS,
    SET_IP_RESTRICTION_SEARCH_QUERY,
    SET_IP_RESTRICTIONS_LOADING,
    SET_UPDATED_IP_RESTRICTION,
    SHOW_IP_RESTRICTION_FILTER,
    SHOW_IP_RESTRICTION_FORM,
    SHOW_IP_RESTRICTION_VIEW
} from "./ipRestirctionTypes";

// Get Ip Restrictions
export const getIpRestrictions = () => (dispatch,getState) => {
    dispatch(setIpRestrictionsLoading());
    const {searchQuery} = getState().ipRestrictions;
    axios
        .get(`${url}/ip-restriction${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_IP_RESTRICTIONS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_IP_RESTRICTIONS,
                payload: {}
            })
        )
}

// Get Ip Restriction by ip.
export const getIpRestrictionByIp = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/ip-restriction/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Create new Ip Restriction
export const createIpRestriction = data => (dispatch,getState) => {
    const {searchQuery} = getState().ipRestrictions;

    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/ip-restriction`,data)
            .then(res => {
                searchQuery === '' ? dispatch(getIpRestrictions()) : dispatch(clearIpRestrictionSearchQuery())
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// Update ip restriction
export const updateIpRestriction = (id,data) => {
    return new Promise(async (resolve,reject) => {
        axios.patch(`${url}/ip-restriction/${id}`,data)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Set Ip Restrictions loading
export const setIpRestrictionsLoading = () => {
    return {
        type: SET_IP_RESTRICTIONS_LOADING
    }
}

// Clear IpRestriction SearchQuery
export const clearIpRestrictionSearchQuery = () => {
    return {
        type: CLEAR_IP_RESTRICTION_SEARCH_QUERY
    }
}


// Show Ip Restriction Form
export const showIpRestrictionForm = (data = {}) => {
    return {
        type: SHOW_IP_RESTRICTION_FORM,
        payload: data
    }
}

// Close Ip Restriction Form
export const closeIpRestrictionForm = () => {
    return {
        type: CLOSE_IP_RESTRICTION_FORM
    }
}

// Show Ip Restriction View
export const showIpRestrictionView = (payload) => {
    return {
        type: SHOW_IP_RESTRICTION_VIEW,
        payload
    }
}

// Close Ip Restriction View
export const closeIpRestrictionView = () => {
    return {
        type: CLOSE_IP_RESTRICTION_VIEW
    }
}

// Set Search query
export const setIpRestrictionSearchQuery = (payload = {}) => {
    return {
        type: SET_IP_RESTRICTION_SEARCH_QUERY,
        payload
    }
}

// Show Ip Restriction Filter
export const showIpRestrictionFilter = () => {
    return {
        type: SHOW_IP_RESTRICTION_FILTER
    }
}

// Close Ip Restriction Filter
export const closeIpRestrictionFilter = () => {
    return {
        type: CLOSE_IP_RESTRICTION_FILTER
    }
}

// Merge updated ip restriction.
export const setUpdateIpRestriction = (payload) => {
    return {
        type: SET_UPDATED_IP_RESTRICTION,
        payload
    }
}

