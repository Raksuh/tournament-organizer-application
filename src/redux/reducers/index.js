import { combineReducers } from "redux";

import tournaments from "./tournaments";
import auth from "./auth";

export default combineReducers({ tournaments, auth });
