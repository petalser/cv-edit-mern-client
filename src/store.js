import { configureStore } from "@reduxjs/toolkit";
import { listener } from "./features/uiSlice";
import networkBoolReducer from "./features/networkBoolSlice";
import globalDataReducer from "./features/globalDataSlice";
import uiReducer from "./features/uiSlice";
import authReducer from "./features/authSlice";
import userDataReducer from "./features/userDataSlice";

export const store = configureStore({
  reducer: {
    networkBool: networkBoolReducer,
    globalData: globalDataReducer,
    ui: uiReducer,
    auth: authReducer,
    userData: userDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});
