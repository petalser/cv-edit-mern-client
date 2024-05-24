import { useState, useRef, useEffect, createElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchGlobalData } from "../features/globalData/globalDataSlice";

const InputableElement = ({ as, field, classes = "" }) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.globalData);

  const [inputBool, setinputBool] = useState(false);
  const [inputValue, setInputValue] = useState(data[field].value);
  const inputRef = useRef();

  const content = createElement(
    as,
    { onClick: () => setinputBool(true), className: `hoverFX ${classes}` },
    data[field].value
  );

  const handleChange = (e) => setInputValue(e.target.value);

  const handleKey = (e) => e.key === "Enter" && inputRef.current.blur();

  const handleBlur = () => {
    setinputBool(false);
    // setDataChunk(field, inputValue);
    const payload = {
      id: field,
      data: { ...data[field], value: inputValue },
    };
    dispatch(patchGlobalData(payload));
  };

  useEffect(() => {
    inputBool && inputRef.current.focus();
  }, [inputBool]);

  return inputBool ? (
    <input
      type="text"
      ref={inputRef}
      className="form-control me-2"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKey}
    />
  ) : (
    content
  );
};

export default InputableElement;
