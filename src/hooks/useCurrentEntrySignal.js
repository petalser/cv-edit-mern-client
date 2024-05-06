import { currentEntrySignal } from "../signals/states";

export const useCurrentEntrySignal = () => {
  const currentEntry = currentEntrySignal.value;

  const setCurrentEntry = (argument) => {
    currentEntrySignal.value = argument;
  };

  return { currentEntry, setCurrentEntry };
};
