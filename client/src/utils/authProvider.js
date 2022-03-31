// authProvider.js
import { MsalAuthProvider, LoginType } from "react-aad-msal";

console.log('client id', process.env.REACT_APP_CLIENT_ID);


// Msal Configurations
const config = {
  auth: {
    authority:
      `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH_CALLBACK_URI
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

console.log('config-------', config);

// Authentication Parameters
const authenticationParameters = {
  scopes: ["user.read"],
};

// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin,
};

export const authProvider = new MsalAuthProvider(
  config,
  authenticationParameters,
  options
);
