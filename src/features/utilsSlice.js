import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  advancedMode: false,
  darkMode: false,
};

export const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setAdvancedMode: (state, action) => {
      state.advancedMode = action.payload;
    },

    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setAdvancedMode, setDarkMode } = utilsSlice.actions;
