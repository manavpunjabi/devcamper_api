import {
  GET_COURSES_FOR_BOOTCAMP,
  COURSE_ERROR,
  ADD_COURSE,
  DELETE_COURSE,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

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

export const addCourse = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/v1/bootcamps/${id}/courses`,
      formData,
      config
    );
    dispatch({
      type: ADD_COURSE,
      payload: res.data,
    });
    dispatch(setAlert("Course added", "success"));
    history.push("/bootcamps");
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    dispatch(setAlert(err.message, "danger"));
  }
};

export const deleteCourse = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/courses/${id}`);
    dispatch({
      type: DELETE_COURSE,
    });
    dispatch(setAlert("Course deleted", "success"));
    history.push("/manage-courses");
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
    dispatch(setAlert(err.message, "danger"));
  }
};
