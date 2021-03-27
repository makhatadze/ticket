import {CLOSE_EXPORT_MODAL, SHOW_EXPORT_MODAL} from "../../actions/export/exportTypes";

const initialState = {
    show: false,
    module: '',
    type: null,
    searchQuery: '',
    keys: [],
    ids: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_EXPORT_MODAL:
            return {
                ...state,
                show: true,
                module: action.payload.module,
                type: action.payload.type,
                searchQuery: action.payload.searchQuery,
                keys: action.payload.keys,
                ids: action.payload.ids
            }
        case CLOSE_EXPORT_MODAL:
            return {
                ...state,
                show: false,
                module: '',
                type: null,
                searchQuery: '',
                keys: [],
                ids: []
            }
        default:
            return state;
    }
}
