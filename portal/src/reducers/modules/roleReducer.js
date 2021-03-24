import {
    CLEAR_ROLE_SEARCH_QUERY, CLOSE_ROLE_FILTER,
    CLOSE_ROLE_FORM, CLOSE_ROLE_VIEW,
    GET_ROLES, SET_ROLE_SEARCH_QUERY,
    SET_ROLES_LOADING, SET_UPDATED_ROLE, SHOW_ROLE_FILTER,
    SHOW_ROLE_FORM, SHOW_ROLE_VIEW
} from "../../actions/role/roleTypes";
import * as queryString from "querystring";

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
        sort: 'id',
        order: 'desc'
    },
    searchQuery: '',
    permissions: [],
    showRoleForm: {
        show: false,
        modalRole: {}
    },
    showRoleView: {
        show: false,
        modalRole: {}
    },
    showRoleFilter: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ROLES_LOADING:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    loading: true
                }
            }
        case GET_ROLES:
            return {
                ...state,
                data: action.payload.data,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload.pagination,
                    loading: false
                },
                permissions: action.payload.permissions
            }
        case CLEAR_ROLE_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: ''
            }
        case SHOW_ROLE_FORM:
            return {
                ...state,
                showRoleForm: {
                    show: true,
                    modalRole: action.payload
                }
            }
        case CLOSE_ROLE_FORM:
            return {
                ...state,
                showRoleForm: {
                    show: false,
                    modalRole: {}
                }
            }
        case SET_UPDATED_ROLE:
            return {
                ...state,
                data: state.data.map(el => el.id === action.payload.id ? action.payload : el)
            }
        case SHOW_ROLE_VIEW:
            return {
                ...state,
                showRoleView: {
                    show: true,
                    modalRole: action.payload
                }
            }
        case CLOSE_ROLE_VIEW:
            return {
                ...state,
                showRoleView: {
                    show: false,
                    modalRole: {}
                }
            }
        case SHOW_ROLE_FILTER:
            return {
                ...state,
                showRoleFilter: true
            }
        case CLOSE_ROLE_FILTER:
            return {
                ...state,
                showRoleFilter: false
            }
        case SET_ROLE_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.searchParams, ...searchQuery, ...action.payload}))}`
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
        sort: searchData.sort,
        order: searchData.order
    }
}