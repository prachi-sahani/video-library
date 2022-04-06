import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DBdataProvider } from "./context/db-data-context";
import { VideoListProvider } from "./context/video-list-management";
import { AuthProvider } from "./context/authorization-context";
import { MessageHandlingProvider } from "./context/message-handling";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MessageHandlingProvider>
        <AuthProvider>
          <DBdataProvider>
            <VideoListProvider>
              <App />
            </VideoListProvider>
          </DBdataProvider>
        </AuthProvider>
      </MessageHandlingProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
