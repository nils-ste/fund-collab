import { Link } from "react-router";

export default function ProjectCard({project, userId, onDelete, setModalProject }) {
     return (
      <div className="max-w-sm m-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-5">
            {project.project_title}
          </h5>

          <div className="flex gap-2">
            <button
              onClick={() => onDelete(userId, project.id)}
              className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Delete project"
            >
              Delete
            </button>

            <button
              onClick={() => setModalProject(project)}
              className="px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Edit project"
            >
              Edit
            </button>
          </div>
        </div>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {project.status}
        </p>

        <Link
          to={`/content/${project.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Show Project
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        </div>
)}