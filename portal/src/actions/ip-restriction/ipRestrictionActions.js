import axios from "axios";

const url = process.env.MIX_SERVER_API_URL;

import {GET_IP_RESTRICTIONS, SET_IP_RESTRICTIONS_LOADING} from "./ipRestirctionTypes";

// Get Ip Restrictions
export const getIpRestrictions = (query = '') => dispatch => {
    dispatch(setIpRestrictionsLoading());
    axios
        .get(`${url}/ip-restriction${query}`)
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


// Set Ip Restrictions loading
export const setIpRestrictionsLoading = () => {
    return {
        type: SET_IP_RESTRICTIONS_LOADING
    }
}