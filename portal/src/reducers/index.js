import {combineReducers} from "redux";
import authReducer from "./modules/authReducer";

export default combineReducers({
    auth: authReducer,
});