import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setS: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { setS } = servicesSlice.actions;
export const selectServices = (state) => state.services.services.services;
