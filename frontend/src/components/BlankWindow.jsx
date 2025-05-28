import React from "react";
import EmptyChatPlaceHolderIcon from "../icons/EmptyChatPlaceHolderIcon.jsx";

const BlankWindow = () => {
  return (
    <div className=" flex items-center justify-center h-screen bg-[#1f1f1f] ">
      <div>
        <EmptyChatPlaceHolderIcon width={500} height={400} />
      </div>
    </div>
  );
};

export default BlankWindow;
