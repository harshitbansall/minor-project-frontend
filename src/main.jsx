import { createRoot } from "react-dom/client";
import App from "./App.jsx";

//////////////////////////////////////////////////////////////// REDUX STORE

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import backendEndpointReducer from "./slices/backendEndpointSlice";

export const Store = configureStore({
  reducer: {
    backendEndpoint: backendEndpointReducer,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
  </Provider>
);
