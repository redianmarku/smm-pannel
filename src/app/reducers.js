import { combineReducers } from "@reduxjs/toolkit";
import { servicesSlice } from "../features/servicesSlice";

export const rootReducer = combineReducers({
  services: servicesSlice.reducer,
});
