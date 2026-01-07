import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Projects from "./Projects/Projects";
import Content from "./Content/Content" ;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Projects userId={1} />} />
        <Route path="/content" element={<Content projectId={1} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
