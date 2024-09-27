import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/posts"; // Ensure this is the correct import
import App from "./App";
import { ThemeProvider, createTheme } from "@material-ui/core";
import "./index.css";
import authReducers from "./reducers/auth";

// Create store using configureStore
const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducers
  },
});

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>
);
