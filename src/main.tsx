import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { AuthProvider } from "./page/context/AuthContext";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_PUBLIC_CLIENT_ID || "",
    authority: import.meta.env.VITE_PUBLIC_TENANT_ID || "",
    redirectUri: import.meta.env.VITE_PUBLIC_REDIRECT_URI || "",
    postLogoutRedirectUri:
      import.meta.env.VITE_PUBLIC_POST_LOGOUT_REDIRECT_URI || "",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: import.meta.env.VITE_PUBLIC_CACHE_LOCATION || "",
    storeAuthStateInCookie:
      import.meta.env.VITE_PUBLIC_STORE_AUTH_STATE_IN_COOKIE === "true",
  },
};
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MsalProvider instance={msalInstance}>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </MsalProvider>
);
