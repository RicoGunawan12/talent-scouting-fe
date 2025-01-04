import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface LoggedInRouteProps {
  children: ReactNode;
}

const LoggedInRoute: React.FC<LoggedInRouteProps> = ({ children }) => {
  const { getRole, isAuthenticated } = useAuth();

  return isAuthenticated ? (
    getRole() == undefined ? (
      <Navigate to="/company/home" />
    ) : (
      <Navigate to="/home" />
    )
  ) : (
    children
  );
};

export default LoggedInRoute;
