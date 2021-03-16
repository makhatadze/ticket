import {CLEAR_CURRENT_PROFILE, GET_CURRENT_PROFILE, PROFILE_LOADING} from "../../actions/profile/profileTypes";

const initialState = {
    currentProfile: {},
    loading: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                currentProfile: {}
            }
        default:
            return state;
    }
}