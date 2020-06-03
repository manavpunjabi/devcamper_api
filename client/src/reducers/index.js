import { combineReducers } from "redux";
import alert from "./alert";
import bootcamp from "./bootcamp";
import auth from "./auth";
import course from "./course";

export default combineReducers({
  alert,
  auth,
  bootcamp,
  course,
});
