import { signal } from "@preact/signals-react";
import defaultData from "../data/defaultValues.json";

export const signalData = signal(defaultData);

export const useData = () => {
  const data = signalData.value;

  const setData = (argument) => {
    signalData.value = argument;
  };

  const resetData = () => {
    signalData.value = defaultData;
  };

  return { data, setData, resetData };
};
