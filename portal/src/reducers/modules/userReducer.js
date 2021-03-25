import {
    CLEAR_USERS_SEARCH_QUERY, CLOSE_USERS_FILTER, CLOSE_USERS_FORM, CLOSE_USERS_VIEW,
    GET_USERS,
    SET_UPDATED_USER,
    SET_USERS_LOADING, SET_USERS_SEARCH_QUERY, SHOW_USERS_FILTER,
    SHOW_USERS_FORM, SHOW_USERS_VIEW
} from "../../actions/user/userTypes";
import * as queryString from "querystring";


const initialState = {
    data: [],
    roles: [],
    searchParams: {
        loading: false,
        count: null,
        per_page: 10,
        current: 1,
        total: null,
        pageSize: 10,
        id: '',
        name: '',
        username: '',
        active: '',
        sort: 'id',
        order: 'desc'
    },
    searchQuery: '',
    showUserForm : {
        show: false,
        modalUser: {}
    },
    showUserView: {
        show: false,
        modalUser: {}
    },
    showUserFilter: false
}

export default function (state = initialState,action) {
    switch (action.type) {
        case SET_USERS_LOADING:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    loading: true
                }
            }
        case GET_USERS:
            return {
                ...state,
                data: action.payload.data,
                roles: action.payload.roles,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        case SET_UPDATED_USER:
            return {
                ...state,
                data: state.data.map(el => el.id === action.payload.id ? action.payload : el)
            }
        case CLEAR_USERS_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: ''
            }
        case SHOW_USERS_FORM:
            return {
                ...state,
                showUserForm: {
                    show: true,
                    modalUser: action.payload
                }
            }
        case CLOSE_USERS_FORM:
            return {
                ...state,
                showUserForm: {
                    show: false,
                    modalUser: {}
                }
            }
        case SHOW_USERS_VIEW:
            return {
                ...state,
                showUserView: {
                    show: true,
                    modalUser: action.payload
                }
            }
        case CLOSE_USERS_VIEW:
            return {
                ...state,
                showUserView: {
                    show: false,
                    modalUser: {}
                }
            }
        case SET_USERS_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.searchParams,...searchQuery,...action.payload}))}`
            }
        case SHOW_USERS_FILTER:
            return {
                ...state,
                showUserFilter: true
            }
        case CLOSE_USERS_FILTER:
            return {
                ...state,
                showUserFilter: false
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
        active: searchData.active,
        sort: searchData.sort,
        order: searchData.order
    }
}
