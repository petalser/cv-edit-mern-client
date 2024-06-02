import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state = initialState;
      return state;
    },
    setUserData: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { clearUserData, setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
