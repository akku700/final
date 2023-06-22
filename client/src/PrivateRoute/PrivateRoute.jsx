/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser")) || null;
  const { pathname } = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};

export default PrivateRoute;
