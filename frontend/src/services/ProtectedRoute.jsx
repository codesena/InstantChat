import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { tokenState } from "../states/atoms.jsx";

const ProtectedRoute = ({ children }) => {
  const token = useRecoilValue(tokenState);
  return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
