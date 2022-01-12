import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateContextProvider } from "./contexts/StateContext";
import store from "./store";
import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    {/* <Suspense fallback={<div>...Loading</div>}> */}
    <Provider store={store}>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Provider>
    {/* </Suspense> */}
  </React.StrictMode>,
  document.getElementById("root")
);
