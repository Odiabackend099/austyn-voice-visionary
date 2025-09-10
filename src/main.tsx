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

// Floating chat removed - using integrated AdaquaAI chat instead
