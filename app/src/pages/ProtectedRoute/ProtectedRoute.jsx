import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { useCookies } from "react-cookie";
const ProtectedRoute = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);
  let location = useLocation();
  if (!cookies.jwtToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
