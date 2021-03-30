import axios from "axios";
import {GET_EXPORT_LOGS, SET_EXPORT_LOGS_LOADING} from "./exportLogTypes";

const url = process.env.MIX_SERVER_API_URL;

// Get Export Logs
export const getExportLogs = () => (dispatch, getState) => {
    dispatch(setExportLogLoading());
    const {searchQuery} = getState().exportLog;
    axios
        .get(`${url}/export-log${searchQuery}`)
        .then(res => {
            dispatch({
                type: GET_EXPORT_LOGS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_EXPORT_LOGS,
                payload: {}
            })
        )
}


// Set export logs loading
export const setExportLogLoading = () => {
    return {
        type: SET_EXPORT_LOGS_LOADING
    }
}