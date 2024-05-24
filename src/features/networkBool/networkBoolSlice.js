import { createSlice } from "@reduxjs/toolkit";

const initialState = { connected: false };

const networkBoolSlice = createSlice({
  name: "networkBool",
  initialState,
  reducers: {
    connected: (state) => {
      state.connected = true;
      console.log(state.connected);
    },
    disconnected: (state) => {
      state.connected = false;
      console.log(state.connected);
    },
  },
});

export const { connected, disconnected } = networkBoolSlice.actions;

export default networkBoolSlice.reducer;
