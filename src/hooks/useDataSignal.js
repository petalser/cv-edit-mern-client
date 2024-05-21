import { signal } from "@preact/signals-react";
import defaultData from "../data/defaultValues.json";

export const signalData = signal(defaultData);

export const useData = () => {
  const data = signalData.value;

  const setData = (argument) => {
    signalData.value = argument;
  };

  const setDataChunk = (key, val) => {
    const copy = { ...signalData.value };
    copy[key].value = val;
    setData(copy);
  };

  const resetData = () => {
    signalData.value = defaultData;
  };

  return { data, setData, setDataChunk, resetData };
};
