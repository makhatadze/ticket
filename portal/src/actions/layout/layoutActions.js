import {SLIDER_TOGGLE} from "./layoutTypes";

export function sliderToggle(layout) {
    return {
        type: SLIDER_TOGGLE,
        payload: layout
    }
}