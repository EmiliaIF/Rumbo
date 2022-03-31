import React from "react";
import ReactDOM from "react-dom";
import { AzureAD, AuthenticationState } from "react-aad-msal";
import { Provider } from "react-redux";
import configureStore, { history } from "./configureStore";

import "./index.css";
import App from "./App";
import { authProvider } from "./utils/authProvider";
import reportWebVitals from "./reportWebVitals";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AzureAD provider={authProvider} forceLogin={true} reduxStore={store}>
        {({ login, logout, authenticationState, error, accountInfo }: any) => {
          switch (authenticationState) {
            case AuthenticationState.Authenticated:
              return (
                <App
                  accountInfo={accountInfo}
                  onLogout={logout}
                  history={history}
                />
              );
            case AuthenticationState.Unauthenticated:
              return (
                <div>
                  {error && (
                    <p>
                      <span>
                        An error occured during authentication, please try
                        again!
                      </span>
                    </p>
                  )}
                  <p>
                    <span>Hey stranger, you look new!</span>
                    <button onClick={login}>Login</button>
                  </p>
                </div>
              );
            case AuthenticationState.InProgress:
              return <p>Authenticating...</p>;
          }
        }}
      </AzureAD>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
