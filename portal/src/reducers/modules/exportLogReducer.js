import * as queryString from "querystring";
import {GET_EXPORT_LOGS, SET_EXPORT_LOGS_LOADING} from "../../actions/export-log/exportLogTypes";

const initialState = {
    data: [],
    searchParams: {
        loading: false,
        count: null,
        per_page: 10,
        current: 1,
        total: null,
        pageSize: 10,
        id: '',
        type: '',
        sort: 'id',
        order: 'desc'
    },
    searchQuery: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_EXPORT_LOGS_LOADING:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    loading: true
                }
            }
        case GET_EXPORT_LOGS:
            return {
                ...state,
                data: action.payload.data,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        default:
            return state;
    }
}

// Return only available search params
function getSearchQueryParams(searchData) {
    return {
        per_page: searchData.pageSize,
        page: searchData.current,
        id: searchData.id,
        type: searchData.name,
        sort: searchData.sort,
        order: searchData.order
    }
}