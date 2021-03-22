import {GET_ROLES, SET_ROLES_LOADING} from "../../actions/role/roleTypes";

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
    permissions: []
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
        default:
            return state;
    }
}