import { combineReducers, createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    set: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { set } = servicesSlice.actions;

export const selectServices = (state) => state.services.services;

export default servicesSlice.reducer;
