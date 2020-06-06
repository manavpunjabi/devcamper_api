import { GET_USER, USER_ERROR, UPDATE_USER } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/users/${id}`);
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

export const updateUser = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/v1/auth/updatedetails", formData, config);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    dispatch(setAlert("User details updated", "success"));
    history.push("/manage-account");
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
        data: err.response.data,
      },
    });
    dispatch(setAlert(err.message, "danger"));
  }
};
