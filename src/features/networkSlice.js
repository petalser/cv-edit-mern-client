import { createSlice } from "@reduxjs/toolkit";

const initialState = { connected: false, pending: true };

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    connected: (state) => {
      state.connected = true;
      state.pending = false;
      return state;
    },
    disconnected: (state) => {
      state.connected = false;
      state.pending = false;
      return state;
    },
  },
});

export const { connected, disconnected } = networkSlice.actions;

export default networkSlice.reducer;
