import { configureStore } from "@reduxjs/toolkit";
import { listener } from "./features/uiSlice";
import networkBoolReducer from "./features/networkBoolSlice";
import globalDataReducer from "./features/globalDataSlice";
import uiReducer from "./features/uiSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    networkBool: networkBoolReducer,
    globalData: globalDataReducer,
    ui: uiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});
