import { createSlice, createListenerMiddleware } from "@reduxjs/toolkit";

const allowedModalTypes = [
  "blank",
  "json",
  "static",
  "dynamic",
  "login",
  "register",
];

const initialState = {
  isPanelEnabled: false,
  isTooltipEnabled: true,
  isExported: false,
  modalType: "blank",
  currentEntry: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    disableTooltip: (state) => {
      state.isTooltipEnabled = false;
      return state;
    },
    enablePanel: (state) => {
      state.isPanelEnabled = true;
      return state;
    },
    disablePanel: (state) => {
      state.isPanelEnabled = false;
      return state;
    },
    setModalType: (state, action) => {
      // if (allowedModalTypes.includes{action.payload}) {}
      state.modalType = action.payload || "blank";
      return state;
    },
    setEntryID: (state, action) => {
      state.currentEntry = action.payload;
      return state;
    },
    //isExported
  },
});

export const {
  toggleButtonGroupHover,
  enablePanel,
  disablePanel,
  setModalType,
  setEntryID,
} = uiSlice.actions;

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: enablePanel,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(uiSlice.actions.disableTooltip());
  },
});

export default uiSlice.reducer;
