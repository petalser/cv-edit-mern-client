import { token } from "../signals/states";

export const useTokenSignal = () => {
  const tokenSignal = token.value;

  const setTokenSignal = (arg) => {
    token.value = arg;
  };

  return { tokenSignal, setTokenSignal };
};
