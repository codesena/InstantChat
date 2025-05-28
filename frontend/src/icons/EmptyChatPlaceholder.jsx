import React from "react";

const EmptyChatPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {/* Chat bubbles */}
      <div className="relative w-40 h-28 mb-6">
        <div className="absolute top-4 left-4 w-36 h-16 bg-gray-300 rounded-xl opacity-50"></div>
        <div className="absolute top-0 left-0 w-36 h-16 bg-white shadow-md rounded-xl z-10"></div>

        {/* Dots and crosses */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-sm">
          +
        </div>
        <div className="absolute top-6 right-8 text-gray-400 text-sm">+</div>
        <div className="absolute bottom-6 left-6 text-gray-400 text-sm">+</div>
      </div>

      {/* Text content */}
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        It's nice to chat with someone
      </h2>
      <p className="text-sm text-gray-500">
        Pick a person from left menu <br />
        and start your conversation
      </p>
    </div>
  );
};

export default EmptyChatPlaceholder;
