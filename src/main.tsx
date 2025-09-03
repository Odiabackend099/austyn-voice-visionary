import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'

// Render your existing site
const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Inject the floating chat widget (separate root, overlays via fixed CSS)
import "./odiadev-floating";
