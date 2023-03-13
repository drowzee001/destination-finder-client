import axios from "axios";
import {
  GET_LOCATIONS,
  GET_LOCATION,
  ADD_LOCATION,
  DELETE_LOCATION,
  LOCATIONS_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getLocations = () => (dispatch, getState) => {
  dispatch(setLocationsLoading());
  const user_id = getState().auth.user.id;
  axios
    .get(`https://destination-finder-server.onrender.com/locations/${user_id}`)
    .then((res) =>
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getLocation = (place_id) => (dispatch, getState) => {
  dispatch(setLocationsLoading());
  const user_id = getState().auth.user.id;
  axios
    .get(`https://destination-finder-server.onrender.com/locations/${user_id}/${place_id}`)
    .then((res) => {
      dispatch({
        type: GET_LOCATION,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addLocation = (place_id, image, name) => (dispatch, getState) => {
  const user_id = getState().auth.user.id;
  const location = { user_id, place_id, image, name };

  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  axios
    .post("https://destination-finder-server.onrender.com/locations", location, config)
    .then((res) =>
      dispatch({
        type: ADD_LOCATION,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteLocation = (id) => (dispatch, getState) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  axios
    .delete(`https://destination-finder-server.onrender.com/locations/${id}`, config)
    .then((res) => {
      dispatch({
        type: DELETE_LOCATION,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setLocationsLoading = () => {
  return {
    type: LOCATIONS_LOADING,
  };
};
