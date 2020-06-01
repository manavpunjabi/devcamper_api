import { GET_BOOTCAMPS, BOOTCAMP_ERROR } from "./types";
import axios from "axios";

export const getLatestBootcamps = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/bootcamps/?sort=date&limit=4");
    dispatch({
      type: GET_BOOTCAMPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getBootcamps = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/bootcamps");
    dispatch({
      type: GET_BOOTCAMPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
