import {
    CLEAR_IP_RESTRICTION_SEARCH_QUERY, CLOSE_IP_RESTRICTION_FORM, CLOSE_IP_RESTRICTION_VIEW,
    GET_IP_RESTRICTIONS,
    SET_IP_RESTRICTIONS_LOADING, SET_UPDATED_IP_RESTRICTION, SHOW_IP_RESTRICTION_FORM, SHOW_IP_RESTRICTION_VIEW
} from "../../actions/ip-restriction/ipRestirctionTypes";


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
    }
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
        default:
            return state;
    }
}