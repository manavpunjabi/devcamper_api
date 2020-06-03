import { GET_REVIEWS, REVIEW_ERROR } from "./types";
import axios from "axios";

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
