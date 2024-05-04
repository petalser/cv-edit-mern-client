import { modalType } from "../signals/states";

export const useModalType = () => {
  const modalTypeSignal = modalType.value;

  const setModalTypeSignal = (value) => {
    modalType.value = value;
  };

  return { modalTypeSignal, setModalTypeSignal };
};
