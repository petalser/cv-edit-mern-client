import { createSlice } from "@reduxjs/toolkit";
import defaultValues from "../data/defaultValues.json";
import emptyValues from "../data/emptyValues.json";

const initialState = defaultValues;

const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    resetGlobalData: (state) => {
      state = defaultValues;
      return state;
    },
    clearGlobalData: (state) => {
      state = emptyValues;
      return state;
    },
    setGlobalData: (state, action) => {
      state = action.payload;
      return state;
    },
    patchGlobalData: (state, action) => {
      const { id, data } = action.payload;
      if ("values" in state[id]) {
        state[id].values = data;
        return state;
      }
      state[id] = data;
      return state;
    },
  },
});

export const {
  setGlobalData,
  resetGlobalData,
  clearGlobalData,
  patchGlobalData,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;
