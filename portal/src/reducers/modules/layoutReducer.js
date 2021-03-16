import {SLIDER_TOGGLE} from "../../actions/layout/layoutTypes";

const initialState = {
    collapsed: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SLIDER_TOGGLE:
            return {
                collapsed: action.payload
            };
        default:
            return state;
    }
}

