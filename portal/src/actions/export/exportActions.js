import {CLOSE_EXPORT_MODAL, SHOW_EXPORT_MODAL} from "./exportTypes";



// Show export modal
export const setUser = payload => {
    return {
        type: SHOW_EXPORT_MODAL,
        payload
    };
};

// Close export modal
export const closeExportModal = () => {
    return {
        type: CLOSE_EXPORT_MODAL
    }
}
