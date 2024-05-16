import { signal } from "@preact/signals-react";

export const userData = signal([]);

export const useUserDataSignal = () => {
  const userDataSignal = userData.value;

  const setUserDataSignal = (arg) => {
    userData.value = arg;
  };

  return { userDataSignal, setUserDataSignal };
};
