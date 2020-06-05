import { GET_REVIEWS, REVIEW_ERROR, ADD_REVIEW } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getReviews = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addReview = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/v1/bootcamps/${id}/reviews`,
      formData,
      config
    );
    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });
    dispatch(setAlert("Review added", "success"));
    history.push("/bootcamps");
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    dispatch(setAlert(err.message, "danger"));
  }
};
