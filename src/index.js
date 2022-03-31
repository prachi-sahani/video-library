import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DBdataProvider } from "./context/db-data-context";
import { VideoListProvider } from "./context/video-list-management";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DBdataProvider>
        <VideoListProvider>
          <App />
        </VideoListProvider>
      </DBdataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
