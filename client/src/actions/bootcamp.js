import {
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  GET_BOOTCAMPS_BY_DISTANCE,
  GET_BOOTCAMPS_BY_FILTER,
  DELETE_BOOTCAMP,
  BOOTCAMP_ERROR,
  ADD_BOOTCAMP,
} from "./types";
import { setAlert } from "./alert";
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

export const getBootcampsByDistance = (
  kms,
  pincode,
  history,
  homepage = false
) => async (dispatch) => {
  try {
    if (homepage) {
      history.push("/bootcamps");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ kms, pincode });
    const res = await axios.get(
      `/api/v1/bootcamps/radius/${pincode}/${kms}`,
      body,
      config
    );
    dispatch({
      type: GET_BOOTCAMPS_BY_DISTANCE,
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

export const getBootcamp = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${id}`);
    dispatch({
      type: GET_BOOTCAMP,
      payload: res.data,
    });
  } catch (err) {
    //console.error(err);
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: {
        msg: err.message,
        status: err.response.status,
      },
    });
  }
};

export const addBootcamp = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/bootcamps", formData, config);
    dispatch({
      type: ADD_BOOTCAMP,
      payload: res.data,
    });
    dispatch(setAlert("Bootcamp added", "success"));
    //history.push("/bootcamps/:id/manage-bootcamp");
  } catch (err) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: {
        msg: err.message,
        status: err.response.status,
        data: err.response.data,
      },
    });
    dispatch(setAlert(err.message, "danger"));
  }
};

export const getBootcampByUser = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/bootcamps/user");
    dispatch({
      type: GET_BOOTCAMP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOTCAMP_ERROR,
      payload: {
        msg: err.message,
        status: err.response.status,
        data: err.response.data,
      },
    });
  }
};

export const deleteBootcamp = (id, history) => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone!")) {
    try {
      await axios.delete(`/api/v1/bootcamps/${id}`);
      dispatch({
        type: DELETE_BOOTCAMP,
      });
      dispatch(setAlert("Bootcamp deleted", "success"));
    } catch (err) {
      dispatch({
        type: BOOTCAMP_ERROR,
        payload: {
          msg: err.message,
          status: err.response.status,
          data: err.response.data,
        },
      });
      dispatch(setAlert(err.message, "danger"));
    }
  }
};

// export const getBootcampsByFilter = ({ career, rating, budget }) => async (
//   dispatch
// ) => {
//   try {
//     dispatch({
//       type: GET_BOOTCAMPS_BY_FILTER,
//       payload: { career, rating, budget },
//     });
//   } catch (err) {
//     dispatch({
//       type: BOOTCAMP_ERROR,
//       payload: {
//         msg: err.response.statusText,
//         status: err.response.status,
//       },
//     });
//   }
// };
