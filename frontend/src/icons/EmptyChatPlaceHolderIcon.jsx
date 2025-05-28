import React from "react";

const EmptyChatPlaceHolderIcon = ({ width = 200, height = 160 }) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="50"
          y="30"
          rx="12"
          ry="12"
          width="100"
          height="50"
          fill="#E5E7EB"
        />
        <rect x="75" y="50" width="50" height="6" rx="3" fill="#9cdae9" />

        <rect
          x="40"
          y="60"
          rx="12"
          ry="12"
          width="120"
          height="60"
          fill="#FFFFFF"
        />
        <rect x="65" y="80" width="60" height="6" rx="3" fill="#9fe3ff" />
        <rect x="65" y="92" width="80" height="6" rx="3" fill="#8ae9ef" />
        <circle cx="35" cy="60" r="5" fill="#CBD5E1" />

        <polygon
          points="110,50 112,56 118,56 113,60 115,66 110,62 105,66 107,60 102,56 108,56"
          fill="#CBD5E1"
          transform="translate(55,-1)"
        />

        <circle cx="50" cy="110" r="2" fill="#CBD5E1" />
        <circle cx="175" cy="40" r="2" fill="#CBD5E1" />
        <circle cx="145" cy="115" r="2" stroke="#CBD5E1" strokeWidth="1.4" />

        <g stroke="#CBD5E1" strokeWidth="1.5">
          <line x1="30" y1="30" x2="30" y2="36" />
          <line x1="27" y1="33" x2="33" y2="33" />

          <line x1="170" y1="100" x2="170" y2="106" />
          <line x1="167" y1="103" x2="173" y2="103" />

          <line x1="100" y1="20" x2="100" y2="26" />
          <line x1="97" y1="23" x2="103" y2="23" />
        </g>
      </svg>
    </div>
  );
};

export default EmptyChatPlaceHolderIcon;
