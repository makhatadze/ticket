import {
    CLOSE_DEPARTMENT_FILTER,
    GET_DEPARTMENTS,
    SET_DEPARTMENTS_LOADING,
    SET_DEPARTMENTS_SEARCH_QUERY, SHOW_DEPARTMENT_FILTER
} from "../../actions/department/departmentTypes";
import queryString from "querystring";

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
        name: '',
        type: '',
        sort: 'id',
        order: 'desc'
    },
    searchQuery: '',
    users: [],
    showDepartmentFilter: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_DEPARTMENTS_LOADING:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    loading: true
                }
            }
        case GET_DEPARTMENTS:
            return {
                ...state,
                data: action.payload.data,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        case SET_DEPARTMENTS_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.searchParams, ...searchQuery, ...action.payload}))}`
            }
        case SHOW_DEPARTMENT_FILTER:
            return {
                ...state,
                showDepartmentFilter: true
            }
        case CLOSE_DEPARTMENT_FILTER:
            return {
                ...state,
                showDepartmentFilter: false
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
        name: searchData.name,
        type: searchData.type,
        sort: searchData.sort,
        order: searchData.order
    }
}