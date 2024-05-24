import { configureStore } from "@reduxjs/toolkit";
import networkBoolReducer from "./features/networkBool/networkBoolSlice";
import globalDataReducer from "./features/globalData/globalDataSlice";

export const store = configureStore({
  reducer: {
    networkBool: networkBoolReducer,
    globalData: globalDataReducer,
  },
});
