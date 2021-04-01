import {GET_DEPARTMENTS, SET_DEPARTMENTS_LOADING} from "../../actions/department/departmentTypes";

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
        default:
            return state;
    }
}