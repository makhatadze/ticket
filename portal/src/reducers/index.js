import {combineReducers} from "redux";
import authReducer from "./modules/authReducer";
import profileReducer from "./modules/profileReducer";
import layoutReducer from "./modules/layoutReducer";
import roleReducer from "./modules/roleReducer";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    layout: layoutReducer,
    roles: roleReducer
});