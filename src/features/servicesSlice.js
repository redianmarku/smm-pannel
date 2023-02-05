import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  isLoading: true,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setS: (state, action) => {
      state.services = action.payload;
    },
    setL: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setS, setL } = servicesSlice.actions;
export const selectServices = (state) => state.data.services.services;
