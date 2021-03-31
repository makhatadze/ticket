import axios from "axios";
import {SET_DEPARTMENTS_LOADING} from "./departmentTypes";

const url = process.env.MIX_SERVER_API_URL;


// Set Departments Loading
export const setDepartmentsLoading = () => {
    return {
        type: SET_DEPARTMENTS_LOADING
    }
}