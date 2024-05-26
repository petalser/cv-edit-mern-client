import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        
    }
})

export {clearUserDataList, addUserEntry} = userDataSlice.actions
export default userDataSlice.reducer