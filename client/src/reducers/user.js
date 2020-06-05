import { GET_USER, USER_ERROR } from "../actions/types";

const initialState = {
  user: null,
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
