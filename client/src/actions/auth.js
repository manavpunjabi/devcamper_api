import axios from "axios";
import { setAlert } from "./alert";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  GET_USER,
  USER_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth/me");
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
        data: err.response.data,
      },
    });
  }
};

// Load User

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/v1/auth/me");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register

export const register = ({ name, email, password, role }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, role });
  try {
    const res = await axios.post(`/api/v1/auth/register`, body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    //  const error = JSON.parse(err.response.);
    dispatch(setAlert(err.response.data.error, "danger"));
    dispatch({
      type: REGISTER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Login

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`/api/v1/auth/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    //  const error = JSON.parse(err.response.);
    dispatch(setAlert(err.response.data.error, "danger"));
    dispatch({
      type: LOGIN_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Logout

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
