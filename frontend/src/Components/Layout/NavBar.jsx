import { Link, NavLink } from "react-router";
import { useState, useContext, useEffect } from "react";
import { ProjectsContext } from "../../Context/projectContext";
import ProjectForm from "../Forms/ProjectForm";
import { AuthContext } from "../../Context/authContext";

export default function NavBar() {
  const { setProjects } = useContext(ProjectsContext);
  const { userId } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      setResizing(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setResizing(false), 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <nav className="bg-(--color-secondary) sticky w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-(--color-font-primary) text-2xl font-semibold (--color-primary)space-nowrap">
              fund-collab
            </span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="text-(--color-primary) bg-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              + Project
            </button>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-(--color-font-secondary) rounded-lg md:hidden focus:outline-none focus:ring-2 hover:ring-(--color-secondary-hover) focus:ring-(--color-secondary-hover)"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${!isMenuOpen ? "max-h-0 opacity-0 scale-95 pointer-events-none md:max-h-full md:opacity-100 md:scale-100 md:pointer-events-auto" : "max-h-96 opacity-100 scale-100 pointer-events-auto"} ${resizing ? "" : "transition-all duration-300 ease-in-out"}`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-(--color-secondary)">
              <li>
                <NavLink
                  to="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 text-(--color-button) rounded-sm md:text-(--color-button-hover) md:p-0"
                      : "block py-2 px-3 text-(--color-font-primary) rounded-sm hover:text-(--color-button-hover) md:hover:bg-transparent md:hover:text-(--color-button-hover) md:p-0"
                  }
                  aria-current="page"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 text-(--color-button) rounded-sm md:text-(--color-button-hover) md:p-0"
                      : "block py-2 px-3 text-(--color-font-primary) rounded-sm hover:text-(--color-button-hover) md:hover:bg-transparent md:hover:text-(--color-button-hover) md:p-0"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 text-(--color-button) rounded-sm md:text-(--color-button-hover) md:p-0"
                      : "block py-2 px-3 text-(--color-font-primary) rounded-sm hover:text-(--color-button-hover) md:hover:bg-transparent md:hover:text-(--color-button-hover) md:p-0"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ease-out">
          <div className="bg-(--color-primary) p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow">
            <button
              className="absolute top-2 right-2 text-(--color-font-secondary) hover:text-(--color-font-primary) dark:hover:text-(--color-primary) text-lg font-bold"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <ProjectForm
              userId={userId}
              setProjects={setProjects}
              closeModal={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
