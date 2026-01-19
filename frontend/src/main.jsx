import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Projects from "./Page/Projects.jsx";
import Content from "./Page/Content.jsx";
import Funding from "./Page/Funding.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import { ProjectsProvider } from "./Context/projectContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProjectsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="projects" element={<Projects userId={1} />} />
            <Route path="content/:projectId" element={<Content />} />
            <Route
              path="funding/:projectId"
              element={<Funding projectId={2} />}
            />
          </Route>
        </Routes>
      </ProjectsProvider>
    </BrowserRouter>
  </StrictMode>
);
