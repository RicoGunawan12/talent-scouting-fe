import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { decrypt } from "../util/Utility";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, getToken, getRole, logout } = useAuth();

  useEffect(() => {
    if (getToken() === undefined) {
      logout();
    }
  }, [getToken, logout]);

  if (getToken() === undefined) {
    return <Navigate to="/" />;
  } else {
    if (decrypt(getRole()) == "false") {
      return <Navigate to="/company/home" />;
    }
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
