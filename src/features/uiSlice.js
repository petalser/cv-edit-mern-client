import { createSlice, createListenerMiddleware } from "@reduxjs/toolkit";

const initialState = {
  isPanelEnabled: false,
  isPanelHovered: false,
  isTooltipEnabled: true,
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
  },
});

export const { toggleButtonGroupHover, enablePanel, disablePanel } =
  uiSlice.actions;

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: enablePanel,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(uiSlice.actions.disableTooltip());
  },
});

export default uiSlice.reducer;
