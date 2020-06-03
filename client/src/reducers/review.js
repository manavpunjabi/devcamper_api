import { GET_REVIEWS, REVIEW_ERROR } from "../actions/types";

const intialState = {
  reviews: [],
  loading: true,
};

export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload.data,
        loading: false,
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
