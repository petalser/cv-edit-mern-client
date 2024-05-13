import { signalData } from "../signals/data";

export const showInput = (e) => {
  const data = signalData.value;
  if (e.target.tagName !== "INPUT") {
    const parentId = e.target.id;
    const parent = data[parentId];
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = parent.description;
    inputField.classList.add("form-control", "me-2");
    inputField.value = parent.value;

    e.target.textContent = "";

    e.target.appendChild(inputField);

    inputField.focus();

    const enterKeyListener = (e) => {
      if (e.key === "Enter") {
        inputField.blur();
      }
    };

    const blurListener = () => {
      signalData.value = {
        ...signalData.value,
        [parentId]: { ...signalData.value[parentId], value: inputField.value },
      };
      inputField.removeEventListener("keydown", enterKeyListener);
      inputField.removeEventListener("blur", blurListener);

      e.target.removeChild(inputField);
      e.target.textContent = parent.value;
    };

    inputField.addEventListener("keydown", enterKeyListener);
    inputField.addEventListener("blur", blurListener);
  }
};
