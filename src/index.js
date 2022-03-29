import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DBdataProvider } from "./context/db-data-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DBdataProvider>
        <App />
      </DBdataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
