import { combineReducers } from "redux";

import token from "./token";
import notification from "./notification";
import room from './room'

export default combineReducers({
    token,
    notification,
    room
});
