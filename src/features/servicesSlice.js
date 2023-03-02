import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  services: [],
  isLoading: true,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setC: (state, action) => {
      state.categories = action.payload;
    },
    setS: (state, action) => {
      state.services = action.payload;
    },
    setL: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setS, setL, setC } = servicesSlice.actions;
export const selectServices = (state) => state.data.services.services;
