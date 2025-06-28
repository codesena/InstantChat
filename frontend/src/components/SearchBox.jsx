import React from "react";

const SearchBox = ({
  value = "",
  id,
  onChange,
  placeholder = "Search or Start a New Chat",
  width=90
}) => {
  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className={`px-2.5 text-center bg-[#242424] w-[${width}%] h-10 rounded-xl outline-none`}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default SearchBox;
