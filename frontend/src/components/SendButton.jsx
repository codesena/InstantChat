// import { IoSend } from "react-icons/io5";

// const SendButton = ({ theme = "dark", onClick }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`p-3 pl-3.5  rounded-full transition-all duration-300 shadow-md 
//         ${
//           theme === "dark"
//             ? "bg-green-500 text-black hover:bg-green-700 "
//             : "bg-gray-200 text-black hover:bg-gray-300"
//         }`}
//     >
//       <IoSend size={22} />
//     </button>
//   );
// };

// export default SendButton;

import { IoSend } from "react-icons/io5";

const SendButton = ({ theme = "dark", onClick }) => {
  const handleClick = (e) => {
    e.preventDefault(); // <- Prevent default Android guess
    e.stopPropagation(); // <- Just to be extra safe
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`p-3 pl-3.5 rounded-full transition-all duration-300 shadow-md 
        ${
          theme === "dark"
            ? "bg-green-500 text-black hover:bg-green-700"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
    >
      <IoSend size={22} />
    </button>
  );
};

export default SendButton;
