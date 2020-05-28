import { combineReducers } from "redux";
import alert from "./alert";
import bootcamp from "./bootcamp";
import auth from "./auth";

export default combineReducers({
  alert,
  auth,
  bootcamp,
});
