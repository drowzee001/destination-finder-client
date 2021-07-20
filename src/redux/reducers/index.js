import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import locationsReducer from "./locationsReducer";

export default combineReducers({
  locations: locationsReducer,
  error: errorReducer,
  auth: authReducer,
});
