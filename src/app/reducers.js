import { combineReducers } from "@reduxjs/toolkit";
import { servicesSlice } from "../features/servicesSlice";
import { userSlice } from "../features/userSlice";
import { utilsSlice } from "../features/utilsSlice";

export const rootReducer = combineReducers({
  services: servicesSlice.reducer,
  user: userSlice.reducer,
  utils: utilsSlice.reducer,
});
