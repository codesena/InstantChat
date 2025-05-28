import React from "react";

const SearchBox = ({
  value = "",
  id,
  onChange,
  placeholder = "Search or Start a New Chat",
}) => {
  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="px-2.5 bg-[#303030] w-[90%] h-10 rounded-xl outline-none"
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default SearchBox;
