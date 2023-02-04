import { combineReducers } from "redux";
import servicesReducer from "../features/servicesReducer";

const rootReducer = combineReducers({
  services: servicesReducer,
});

export default rootReducer;
