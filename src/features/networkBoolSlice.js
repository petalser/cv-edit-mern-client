import { createSlice } from "@reduxjs/toolkit";

const initialState = { connected: false };

const networkBoolSlice = createSlice({
  name: "networkBool",
  initialState,
  reducers: {
    connected: (state) => {
      state.connected = true;
      return state;
    },
    disconnected: (state) => {
      state.connected = false;
      return state;
    },
  },
});

export const { connected, disconnected } = networkBoolSlice.actions;

export default networkBoolSlice.reducer;
