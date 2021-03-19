import axios from "axios";

const url = process.env.MIX_SERVER_API_URL;

import {
    CLEAR_IP_RESTRICTION_SEARCH_QUERY, CLOSE_IP_RESTRICTION_FORM,
    GET_IP_RESTRICTIONS,
    SET_IP_RESTRICTIONS_LOADING, SHOW_IP_RESTRICTION_FORM
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

// Create new Ip Restriction
export const createIpRestriction = data => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios
            .post(`${url}/ip-restriction`,data)
            .then(res => {
                dispatch(clearIpRestrictionSearchQuery())
                dispatch(getIpRestrictions())
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
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
export const showIpRestrictionForm = () => {
    return {
        type: SHOW_IP_RESTRICTION_FORM
    }
}

// Close Ip Restriction Form
export const closeIpRestrictionForm = () => {
    return {
        type: CLOSE_IP_RESTRICTION_FORM
    }
}