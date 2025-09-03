import React from "react";
import ReactDOM from "react-dom/client";
import OdiaFloatingChat from "./components/OdiaFloatingChat";

// Create a separate mount node so we never interfere with your existing app DOM
(function mountOdiaDevFloating() {
  const id = "odiadev-floating-root";
  if (document.getElementById(id)) return;
  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);

  ReactDOM.createRoot(div).render(
    <React.StrictMode>
      <OdiaFloatingChat />
    </React.StrictMode>
  );
})();