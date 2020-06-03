import { GET_COURSES_FOR_BOOTCAMP, COURSE_ERROR } from "./types";
import axios from "axios";

export const getCoursesForBootcamp = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${id}/courses`);
    dispatch({
      type: GET_COURSES_FOR_BOOTCAMP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
