import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  getToken: () => string | undefined;
  getRole: () => string | undefined;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("is_microsoft")
  );

  useEffect(() => {
    async function checkAuth() {
      const token = Cookies.get("is_microsoft");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
    }
    checkAuth();
  }, []);

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  function getRole() {
    const token = Cookies.get("is_microsoft");
    return token;
  }

  function getToken() {
    const token = Cookies.get("name");
    return token;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getToken, getRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
