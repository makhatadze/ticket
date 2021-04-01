import axios from "axios";
import {GET_DEPARTMENTS, SET_DEPARTMENTS_LOADING, SET_DEPARTMENTS_SEARCH_QUERY} from "./departmentTypes";

const url = process.env.MIX_SERVER_API_URL;


// Get Departments
export const getDepartments = () => (dispatch, getState) => {
    dispatch(setDepartmentsLoading());
    const {searchQuery} = getState().departments;
    axios
        .get(`${url}/department${searchQuery}`)
        .then(res =>
            dispatch({
                type: GET_DEPARTMENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_DEPARTMENTS,
                payload: {}
            })
        )
}

// Set Departments Loading
export const setDepartmentsLoading = () => {
    return {
        type: SET_DEPARTMENTS_LOADING
    }
}

// Set Department Search Query
export const setDepartmentSearchQuery = (payload = {} ) => {
    return {
        type: SET_DEPARTMENTS_SEARCH_QUERY,
        payload
    }
}