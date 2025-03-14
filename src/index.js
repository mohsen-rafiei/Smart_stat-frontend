import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import for React 18+
import "./index.css"; // ✅ Make sure Tailwind is included
import UXHFQuestionnaire from "./UXHFQuestionnaire";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UXHFQuestionnaire />
  </React.StrictMode>
);
