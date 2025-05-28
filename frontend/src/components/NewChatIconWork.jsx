import React from "react";
import NewChatIcon from "../icons/NewChatIcon.jsx";

const NewChatIconWork = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <NewChatIcon size={20} />
    </div>
  );
};

export default NewChatIconWork;
