import {GET_IP_RESTRICTIONS, SET_IP_RESTRICTIONS_LOADING} from "../../actions/ip-restriction/ipRestirctionTypes";


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
    searchQuery: ''
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
        default:
            return state;
    }
}