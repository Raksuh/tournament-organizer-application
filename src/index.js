import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./redux/reducers";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
