import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import AccessibilityButton from "./layout/common/AccessibilityButton/AccessibilityButton";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AccessibilityButton ariaLabel="Activate accessibility mode">
      Accessibility
    </AccessibilityButton>
    <App />
  </BrowserRouter>
);
