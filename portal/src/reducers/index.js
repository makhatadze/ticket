import {combineReducers} from "redux";
import authReducer from "./modules/authReducer";
import profileReducer from "./modules/profileReducer";
import layoutReducer from "./modules/layoutReducer";
import roleReducer from "./modules/roleReducer";
import ipRestrictionReducer from "./modules/ipRestrictionReducer";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    layout: layoutReducer,
    roles: roleReducer,
    ipRestrictions: ipRestrictionReducer
});