import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Projects from "./Page/Projects.jsx";
import Content from "./Page/Content.jsx" ;
import Funding from "./Page/Funding.jsx";
import Layout from "./Components/Layout/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Projects userId={1} />} />
        <Route path="/content/:projectId" element={<Content />} />
        <Route path="/funding/" element={<Funding projectId={2}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
