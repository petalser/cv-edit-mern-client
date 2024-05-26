import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        clearUserData: (state) => {
            state = initialState
        },
        //  addUseDataEntry: () => {}, 
         setUserData: (state, action) => {
            state = action.payload
         }
    }
})

export {clearUserData, addUseDataEntry, setUserData} = userDataSlice.actions
export default userDataSlice.reducer