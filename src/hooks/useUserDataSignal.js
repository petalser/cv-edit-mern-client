import { userData } from "../signals/userData";

export const useUserDataSignal = () => {
  const userDataSignal = userData.value;

  const setUserDataSignal = (arg) => {
    userData.value = arg;
  };

  return { userDataSignal, setUserDataSignal };
};
