import { Link } from "react-router";
import { useContext } from "react";
import { FundingContext } from "../../Context/fundingContext";
import { Clock } from "lucide-react";

export default function ProjectCard({
  project,
  userId,
  onDelete,
  setModalProject,
}) {
  const { funding } = useContext(FundingContext);
  const projectFunding = funding.filter((f) => f.project_id === project.id);
  const nextFunding = projectFunding.reduce((earliest, current) => {
    if (!earliest) return current;
    return new Date(current.deadline) < new Date(earliest.deadline)
      ? current
      : earliest;
  }, null);

  const today = new Date();
  let daysLeft = null;

  if (nextFunding) {
    const deadlineDate = new Date(nextFunding.deadline);
    const diffTime = deadlineDate - today;
    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function getUrgencyStyle(daysLeft) {
    if (daysLeft <= 3) {
      return {
        containerClass: "bg-red-50 border-red-200",
        textClass: "text-red-700",
        iconClass: "text-red-500",
        label: "Urgent",
      };
    }
    if (daysLeft <= 7) {
      return {
        containerClass: "bg-amber-50 border-amber-200",
        textClass: "text-amber-700",
        iconClass: "text-amber-500",
        label: "Soon",
      };
    }
    return {
      containerClass: "bg-slate-50 border-slate-200",
      textClass: "text-slate-600",
      iconClass: "text-slate-400",
      label: "",
    };
  }

  const urgency = getUrgencyStyle(daysLeft);

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
      {/**Urgency Tag */}
      {nextFunding ? (
        <div
          className={`flex mb-3 items-center gap-3 p-3 rounded-lg border ${urgency.containerClass}`}
        >
          <Clock className={`size-4 shrink-0 ${urgency.iconClass}`} />
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${urgency.textClass}`}>
              {nextFunding.title}
            </p>
            <p className={`text-xs ${urgency.textClass} opacity-80`}>
              {daysLeft === 0
                ? "Due today"
                : daysLeft === 1
                  ? "1 day left"
                  : `${daysLeft} days left`}
              {urgency.label && (
                <span className="ml-1.5 font-semibold">• {urgency.label}</span>
              )}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No upcoming funding
        </p>
      )}

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
