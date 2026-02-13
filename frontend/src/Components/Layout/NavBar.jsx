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
      <nav className="bg-(--color-secondary) dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-(--color-primary) text-2xl font-semibold whitespace-nowrap dark:text-white">
              fund-collab
            </span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="text-(--color-secondary) bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              + Project
            </button>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-(--color-secondary) dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 text-(--color-button-hover) rounded-sm md:text-(--color-button-hover) md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded-sm hover:text-(--color-button-hover) md:hover:bg-transparent md:hover:text-(--color-button-hover) md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
                      ? "block py-2 px-3 text-(--color-button-hover) rounded-sm md:text-(--color-button-hover) md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded-sm hover:text-(--color-button-hover) md:hover:bg-transparent md:hover:text-(--color-button-hover) md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
                      ? "block py-2 px-3 text-(--color-button-hover) rounded-sm md:text-(--color-button-hover) md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded-sm hover:text-(--color-button-hover) md:hover:bg-transparent md:hover:text-(--color-button-hover) md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow dark:bg-gray-800 dark:text-white">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-lg font-bold"
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
