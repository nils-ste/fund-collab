import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../Badges/StatusBadge";
import UrgencyBadge from "../Badges/UrgencyBadge";
import TaglinePreview from "../Badges/TaglinePreview";

export default function ProjectCard({
  project,
  userId,
  onDelete,
  setModalProject,
}) {

  return (
    <div className="max-w-sm min-w-sm m-2 p-6 bg-white border border-gray-200 rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0">
          <StatusBadge status={project.status} />
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mr-5">
            {project.project_title}
          </h5>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setModalProject(project)}
            aria-label="Edit project"
            className="flex text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-1 mb-2.5 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(userId, project.id)}
            aria-label="Delete project"
            className="flex text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mb-2.5 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/** Need to implement tagline here, maybe shorten if too long */}
      <TaglinePreview project={project}/>
      <UrgencyBadge project={project} />

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
  );
}
