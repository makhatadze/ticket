import {combineReducers} from "redux";
import authReducer from "./modules/authReducer";
import profileReducer from "./modules/profileReducer";
import layoutReducer from "./modules/layoutReducer";
import roleReducer from "./modules/roleReducer";
import ipRestrictionReducer from "./modules/ipRestrictionReducer";
import userReducer from "./modules/userReducer";
import exportReducer from "./modules/exportReducer";
import exportLogReducer from "./modules/exportLogReducer";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    layout: layoutReducer,
    roles: roleReducer,
    ipRestrictions: ipRestrictionReducer,
    users: userReducer,
    export: exportReducer,
    exportLog: exportLogReducer
});
