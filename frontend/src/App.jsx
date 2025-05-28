// import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import SignUp from "./pages/SignUp.jsx";
import Signin from "./pages/SignIn.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/app" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
