import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  balance: 0,
  orders: [],
  payments: [],
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = null;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setOrder: (state, action) => {
      state.orders = action.payload;
    },
    setPayment: (state, action) => {
      state.payments = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  setBalance,
  setOrder,
  setPayment,
  setLoading,
} = userSlice.actions;
