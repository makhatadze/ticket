import axios from "axios";
import {
    CLOSE_DEPARTMENT_FILTER, CLOSE_DEPARTMENT_VIEW,
    GET_DEPARTMENTS,
    SET_DEPARTMENTS_LOADING,
    SET_DEPARTMENTS_SEARCH_QUERY,
    SHOW_DEPARTMENT_FILTER, SHOW_DEPARTMENT_FORM, SHOW_DEPARTMENT_VIEW
} from "./departmentTypes";

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

export const getDepartmentById = (id) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(`${url}/department/${id}`)
            .then((res) => resolve(res.data))
            .catch(err => reject(err))
    })
}

// Set Departments Loading
export const setDepartmentsLoading = () => {
    return {
        type: SET_DEPARTMENTS_LOADING
    }
}

// Set Department Search Query
export const setDepartmentSearchQuery = (payload = {}) => {
    return {
        type: SET_DEPARTMENTS_SEARCH_QUERY,
        payload
    }
}

// Show Department filter
export const showDepartmentFilter = () => {
    return {
        type: SHOW_DEPARTMENT_FILTER
    }
}

// Close Department filter
export const closeDepartmentFilter = () => {
    return {
        type: CLOSE_DEPARTMENT_FILTER
    }
}

// Show department view
export const showDepartmentView = (payload = {}) => {
    return {
        type: SHOW_DEPARTMENT_VIEW,
        payload
    }
}

// Close department view
export const closeDepartmentView = () => {
    return {
        type: CLOSE_DEPARTMENT_VIEW
    }
}

// show department form
export const showDepartmentForm = (payload = {}) => {
    return {
        type: SHOW_DEPARTMENT_FORM,
        payload
    }
}