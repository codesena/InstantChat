import React from "react";
//  i will add it later on 
const ChatBubble = ({
  text = "Hello",
  time = "6:40 pm",
}) => {
  return (
    <svg
      width="auto"
      height="60"
      viewBox="0 0 320 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <!-- Chat Bubble --> */}
      <path
        d="M10 10 h270 q10 0 10 10 v25 q0 10 -10 10 h-250 l-20 10 v-10 q-10 0 -10 -10 v-25 q0 -10 10 -10 z"
        fill="#025d4a"
        stroke="#025d4a"
        strokeWidth="2"
        rx="15"
      />

      {/* <!-- Message Text --> */}
      <text x="20" y="30" font-size="16" fill="white" font-family="Arial">
        {text}
      </text>

      {/* <!-- Time --> */}
      <text x="260" y="45" font-size="12" fill="#b3e0dc" font-family="Arial">
        {time}
      </text>

      {/* <!-- Double Tick Icon --> */}
      <path
        d="M270 45 l4 4 l8 -8 m-20 4 l4 4 l8 -8"
        stroke="#34b7f1"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default ChatBubble;
