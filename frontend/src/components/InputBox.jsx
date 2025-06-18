export default function InputBox({ sendMessage, inputBoxRef }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };
  return (
    <input
      ref={inputBoxRef}
      type="text"
      placeholder="Type a message"
      onKeyDown={handleKeyPress}
      className="w-full outline-none p-3 bg-transparent text-white"
    />
  );
}
