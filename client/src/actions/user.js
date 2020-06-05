import { GET_USER, USER_ERROR } from "./types";
import axios from "axios";

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
