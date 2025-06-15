import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import SignUp from "./pages/SignUp.jsx";
import Signin from "./pages/SignIn.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { Analytics } from "@vercel/analytics/react";
function ErrorFallback({ error }) {
  return <div>Something went wrong: {error.message}</div>;
}

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/app" element={<Layout />} />
          </Routes>
        </Router>
      </ErrorBoundary>
      <Analytics />
    </>
  );
}

export default App;
