import {
    CLOSE_EXPORT_MODAL,
    EXPORT_ALL, EXPORT_FILTER, EXPORT_IDS,
    EXPORT_LOADING_FALSE,
    EXPORT_LOADING_TRUE,
    SHOW_EXPORT_MODAL
} from "./exportTypes";
import axios from "axios";
import {toast} from "react-toastify";
const url = process.env.MIX_SERVER_API_URL;
const fileDownload = require('js-file-download');


// Create new user
export const exportData = (keys) => (dispatch, getState) => {
    dispatch(exportLoadingTrue())
    const {module, searchQuery, ids, type} = getState().export;
    let data = {
        ids: ids,
        type: type,
        keys: keys
    }
    axios
        .post(`${url}/${module}/export${searchQuery}`, data,{ responseType: 'blob'})
        .then(res => {
            dispatch(exportLoadingFalse())
            fileDownload(res.data,'test.xlsx')
            toast.success(`Download Successfully`)
        })
        .catch(err => {
            dispatch(exportLoadingFalse())
        })
}


// Show export modal
export const showExportModal = (type,payload) => (dispatch) => {
    switch (type){
        case EXPORT_ALL:
            dispatch({
                type: SHOW_EXPORT_MODAL,
                payload
            })
            break;
        case EXPORT_FILTER:
            dispatch({
                type: SHOW_EXPORT_MODAL,
                payload
            })
            break;
        case EXPORT_IDS:
            dispatch({
                type: SHOW_EXPORT_MODAL,
                payload
            })
            break;
        default:
            toast.error('Please Give type')
            return;
    }
};

// Close export modal
export const closeExportModal = () => {
    return {
        type: CLOSE_EXPORT_MODAL
    }
}

// Set true export loading
export const exportLoadingTrue = () => {
    return {
        type: EXPORT_LOADING_TRUE
    }
}

// Set false export loading
export const exportLoadingFalse = () => {
    return {
        type: EXPORT_LOADING_FALSE
    }
}
