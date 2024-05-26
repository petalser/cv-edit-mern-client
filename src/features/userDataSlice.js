import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state = initialState;
    },
    setUserData: (state, action) => {
      state = action.payload;
    },
  },
});

export const { clearUserData, setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
