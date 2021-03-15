import isEmpty from "../../core/validation/is-empty";
import {SET_AUTH_ERRORS, SET_USER} from "../../actions/auth/authTypes";

const initialState = {
    isAuthenticated: false,
    user: {},
    errors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case SET_AUTH_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}