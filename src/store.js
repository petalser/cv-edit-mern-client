import { configureStore } from "@reduxjs/toolkit";
import { listener } from "./features/uiSlice";
import network from "./features/networkSlice";
import globalData from "./features/globalDataSlice";
import ui from "./features/uiSlice";
import auth from "./features/authSlice";
import userData from "./features/userDataSlice";

export const store = configureStore({
  reducer: {
    network,
    globalData,
    ui,
    auth,
    userData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});
