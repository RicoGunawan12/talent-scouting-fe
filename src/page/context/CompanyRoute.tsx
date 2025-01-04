import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { decrypt } from "../util/Utility";
import { useMsal } from "@azure/msal-react";

interface CompanyRouteProps {
  children: ReactNode;
}

const CompanyRoute: React.FC<CompanyRouteProps> = ({ children }) => {
  const { isAuthenticated, getToken, getRole, logout } = useAuth();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (getToken() === undefined) {
      logout();
    }

    async function checkAuth() {
      if (getToken() === undefined) {
        await instance.logoutRedirect({
          account: accounts[0],
          postLogoutRedirectUri: import.meta.env.VITE_REDIRECT_URI,
        });
        return <Navigate to="/" />;
      } else {
        if (decrypt(getRole()) == "true") {
          return <Navigate to="/home" />;
        }
      }
    }

    checkAuth();
  }, [getToken, logout]);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default CompanyRoute;
