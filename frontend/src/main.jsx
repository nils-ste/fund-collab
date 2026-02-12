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
import { ContentProvider } from "./Context/contentContext.jsx";
import { FundingProvider } from "./Context/fundingContext.jsx";
import { AuthProvider } from "./Context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <ContentProvider>
            <FundingProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<App />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="content/:projectId" element={<Content />} />
                  <Route path="funding/:projectId" element={<Funding />} />
                  <Route path="about" />
                  <Route path="contact" />
                </Route>
              </Routes>
            </FundingProvider>
          </ContentProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
