import {
    CLEAR_IP_RESTRICTION_SEARCH_QUERY, CLOSE_IP_RESTRICTION_FORM,
    GET_IP_RESTRICTIONS,
    SET_IP_RESTRICTIONS_LOADING, SHOW_IP_RESTRICTION_FORM
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
    showIpRestrictionForm : false
}

export default function (state = initialState,action) {
    switch (action.type){
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
        case CLEAR_IP_RESTRICTION_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: ''
            }
        case SHOW_IP_RESTRICTION_FORM:
            return {
                ...state,
                showIpRestrictionForm: true
            }
        case CLOSE_IP_RESTRICTION_FORM:
            return {
                ...state,
                showIpRestrictionForm: false
            }
        default:
            return state;
    }
}