import {
    CLOSE_EXPORT_MODAL,
    EXPORT_LOADING_FALSE,
    EXPORT_LOADING_TRUE,
    SHOW_EXPORT_MODAL
} from "../../actions/export/exportTypes";

const initialState = {
    title: 'Export',
    show: false,
    module: '',
    type: null,
    searchQuery: '',
    ids: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_EXPORT_MODAL:
            return {
                ...state,
                title: action.payload.title,
                show: true,
                module: action.payload.module,
                type: action.payload.type,
                searchQuery: action.payload.searchQuery,
                ids: action.payload.ids
            }
        case CLOSE_EXPORT_MODAL:
            return {
                ...state,
                title: 'Export',
                show: false,
                module: '',
                type: null,
                searchQuery: '',
                ids: []
            }
        case EXPORT_LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case EXPORT_LOADING_FALSE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
