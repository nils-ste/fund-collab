import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Projects from "./Page/Projects.jsx";
import Content from "./Page/Content.jsx";
import Funding from "./Page/Funding.jsx";
import About from "./Page/About.jsx";
import Contact from "./Page/Contact.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Authentication from "./Page/Authentication.jsx";
import { ProjectsProvider } from "./Context/projectContext.jsx";
import { ContentProvider } from "./Context/contentContext.jsx";
import { FundingProvider } from "./Context/fundingContext.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import { ThemeProvider } from "./Context/themeContext.jsx";
import { PermissionsProvider } from "./Context/permissionsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProjectsProvider>
            <ContentProvider>
              <FundingProvider>
                <PermissionsProvider>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<App />} />
                      <Route
                        path="authentication"
                        element={<Authentication />}
                      />
                      <Route path="projects" element={<Projects />} />
                      <Route path="content/:projectId" element={<Content />} />
                      <Route path="funding/:projectId" element={<Funding />} />
                      <Route path="about" element={<About />} />
                      <Route path="contact" element={<Contact />} />
                    </Route>
                  </Routes>
                </PermissionsProvider>
              </FundingProvider>
            </ContentProvider>
          </ProjectsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
