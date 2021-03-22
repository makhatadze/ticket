import {
    CLEAR_IP_RESTRICTION_SEARCH_QUERY,
    CLOSE_IP_RESTRICTION_FILTER,
    CLOSE_IP_RESTRICTION_FORM,
    CLOSE_IP_RESTRICTION_VIEW,
    GET_IP_RESTRICTIONS,
    SET_IP_RESTRICTION_SEARCH_PARAMS,
    SET_IP_RESTRICTION_SEARCH_QUERY,
    SET_IP_RESTRICTIONS_LOADING,
    SET_UPDATED_IP_RESTRICTION, SHOW_IP_RESTRICTION_FILTER,
    SHOW_IP_RESTRICTION_FORM,
    SHOW_IP_RESTRICTION_VIEW
} from "../../actions/ip-restriction/ipRestirctionTypes";
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
        ip: '',
        status: '',
        sort: 'id',
        order: 'desc'
    },
    searchQuery: '',
    showIpRestrictionForm: {
        show: false,
        modalIp: {}
    },
    showIpRestrictionView: {
        show: false,
        modalIp: {}
    },
    showIpRestrictionFilter: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_IP_RESTRICTIONS_LOADING:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    loading: true
                }
            }
        case GET_IP_RESTRICTIONS:
            return {
                ...state,
                data: action.payload.data,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload.pagination,
                    loading: false
                }
            }
        case SET_UPDATED_IP_RESTRICTION:
            return {
                ...state,
                data: state.data.map(el => el.id === action.payload.id ? action.payload : el)
            }
        case CLEAR_IP_RESTRICTION_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: ''
            }
        case SHOW_IP_RESTRICTION_FORM:
            return {
                ...state,
                showIpRestrictionForm: {
                    show: true,
                    modalIp: action.payload
                }
            }
        case CLOSE_IP_RESTRICTION_FORM:
            return {
                ...state,
                showIpRestrictionForm :{
                    show: false,
                    modalIp: {}
                }
            }
        case SHOW_IP_RESTRICTION_VIEW:
            return {
                ...state,
                showIpRestrictionView: {
                    show: true,
                    modalIp: action.payload
                }
            }
        case CLOSE_IP_RESTRICTION_VIEW: {
            return {
                ...state,
                showIpRestrictionView: {
                    show: false,
                    modalIp: {}
                }
            }
        }
        case SET_IP_RESTRICTION_SEARCH_QUERY:
            let searchQuery = queryString.parse(state.searchQuery)
            return {
                ...state,
                searchQuery: `?${queryString.stringify(getSearchQueryParams({...state.searchParams,...searchQuery,...action.payload}))}`
            }
        case SHOW_IP_RESTRICTION_FILTER:
            return {
                ...state,
                showIpRestrictionFilter: true
            }
        case CLOSE_IP_RESTRICTION_FILTER:
            return {
                ...state,
                showIpRestrictionFilter: false
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
        ip: searchData.ip,
        sort: searchData.sort,
        order: searchData.order
    }
}