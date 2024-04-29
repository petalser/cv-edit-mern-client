import { useState, useRef, useEffect } from "react";

const Input = ({ text, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [string, setString] = useState(text);

  const fieldRef = useRef();

  useEffect(() => {
    if (isEditing) {
      fieldRef.current.focus();
    }
  }, [isEditing]);

  return (
    <span
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
    >
      {isEditing && (
        <input
          type="text"
          ref={fieldRef}
          value={string}
          placeholder={placeholder}
          onChange={(e) => setString(e.target.value)}
        />
      )}

      {!isEditing && <span>{string || text}</span>}
    </span>
  );
};

export default Input;
