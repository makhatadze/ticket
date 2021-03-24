import {
    CLEAR_ROLE_SEARCH_QUERY,
    CLOSE_ROLE_FORM, CLOSE_ROLE_VIEW,
    GET_ROLES,
    SET_ROLES_LOADING, SET_UPDATED_ROLE,
    SHOW_ROLE_FORM, SHOW_ROLE_VIEW
} from "../../actions/role/roleTypes";

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
    }
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
        default:
            return state;
    }
}