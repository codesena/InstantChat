import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { tokenLoadedState, tokenState } from "./states/atoms.jsx";

createRoot(document.getElementById("root")).render(
  <RecoilRoot
    initializeState={({ set }) => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) set(tokenState, storedToken);
      set(tokenLoadedState, true);
    }}
  >
    <App />
  </RecoilRoot>
);
