import { GET_USER, USER_ERROR, UPDATE_USER } from "../actions/types";

const initialState = {
  user: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload.data,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
