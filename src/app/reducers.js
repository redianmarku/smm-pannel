import { combineReducers } from "@reduxjs/toolkit";
import { servicesSlice } from "../features/servicesSlice";
import { userSlice } from "../features/userSlice";

export const rootReducer = combineReducers({
  services: servicesSlice.reducer,
  user: userSlice.reducer,
});
