import {
  GET_LOCATIONS,
  GET_LOCATION,
  ADD_LOCATION,
  DELETE_LOCATION,
  LOCATIONS_LOADING,
} from "../actions/types";

const initialState = {
  array: [],
  location: { saved: false, id: null },
  loading: true,
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        array: action.payload,
        loading: false,
      };
    case GET_LOCATION:
      return {
        ...state,
        location: action.payload,
        loading: false,
      };
    case DELETE_LOCATION:
      return {
        ...state,
        array: state.array.filter(
          (location) => location._id !== action.payload
        ),
      };
    case ADD_LOCATION:
      return {
        ...state,
      };
    case LOCATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
