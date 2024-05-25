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
  isPanelHovered: false,
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
    },
    toggleButtonGroupHover: (state) => {
      state.isPanelHovered = state.isPanelHovered ? false : true;
    },
    enablePanel: (state) => {
      state.isPanelEnabled = true;
    },
    disablePanel: (state) => {
      state.isPanelEnabled = false;
    },
    setModalType: (state, action) => {
      // if (allowedModalTypes.includes{action.payload}) {}
      state.modalType = action.payload || "blank";
    },
    setEntryID: (state, action) => {
      state.currentEntryID = action.payload;
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
