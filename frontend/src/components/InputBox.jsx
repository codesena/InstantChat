import React, { useRef } from "react";
const InputBox = ({ onSend }) => {
  const inputRef = useRef();
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputRef.current.value) {
      if (inputRef.current.value.trim()) onSend(inputRef.current.value.trim());
      inputRef.current.value = "";
    }
  };
  return (
    <>
      <input
        placeholder="Type a message"
        ref={inputRef}
        onKeyDown={handleKeyPress}
        className="w-full outline-none justify-between  p-2 pl-8 mb-2 "
      />
    </>
  );
};

export default InputBox;
