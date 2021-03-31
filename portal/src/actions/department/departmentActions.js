import axios from "axios";
import {GET_DEPARTMENTS, SET_DEPARTMENTS_LOADING} from "./departmentTypes";

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