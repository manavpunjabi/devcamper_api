import {
  GET_COURSES_FOR_BOOTCAMP,
  COURSE_ERROR,
  ADD_COURSE,
} from "../actions/types";

const initialState = {
  courses: [],
  loading: true,
  course: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COURSES_FOR_BOOTCAMP:
      return {
        ...state,
        courses: payload.data,
        loading: false,
      };
    case ADD_COURSE:
      return {
        ...state,
        course: payload.data,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
