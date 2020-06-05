import {
  GET_BOOTCAMPS,
  BOOTCAMP_ERROR,
  GET_BOOTCAMPS_BY_DISTANCE,
  GET_BOOTCAMP,
  ADD_BOOTCAMP,
} from "../actions/types";

const initialState = {
  bootcamps: [],
  loading: true,
  bootcamp: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOTCAMPS:
      return {
        ...state,
        bootcamps: payload.data,
        loading: false,
      };
    case GET_BOOTCAMP:
      return {
        ...state,
        bootcamp: payload.data,
        loading: false,
        bootcamps: [],
      };
    case GET_BOOTCAMPS_BY_DISTANCE:
      return {
        ...state,
        bootcamps: payload.data,
        loading: false,
      };
    case ADD_BOOTCAMP:
      return {
        ...state,
        bootcamp: payload.data,
        loading: false,
      };
    case BOOTCAMP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
