import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state = action.payload;
    },
    clearToken: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
