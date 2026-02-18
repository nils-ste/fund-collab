import { useContext } from "react";
import { FundingContext } from "../../Context/fundingContext";
import { Clock } from "lucide-react";

export default function UrgencyBadge({ project }) {
  const { funding } = useContext(FundingContext);
  const projectFunding = funding.filter((f) => f.project_id === project.id);
  function isSameOrAfterToday(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date >= today;
  }

  const upcoming = projectFunding.filter((f) => isSameOrAfterToday(f.deadline));

  const nextFunding = upcoming.reduce((earliest, current) => {
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
        containerClass: "bg-(--color-urgent-bg) border-(--color-urgent-border)",
        textClass: "text-(--color-urgent-text)",
        iconClass: "text-(--color-urgent-icon)",
        label: "Urgent",
      };
    }
    if (daysLeft <= 7) {
      return {
        containerClass: "bg-(--color-soon-bg) border-(--color-soon-badge)",
        textClass: "text-(--color-soon-text)",
        iconClass: "text-(--color-soon-icon)",
        label: "Soon",
      };
    }
    return {
      containerClass: "bg-(--color-neutral-bg) border-(--color-neutral-border)",
      textClass: "text-(--color-neutral-text)",
      iconClass: "text-(--color-neutral-icon)",
      label: "",
    };
  }

  const urgency = getUrgencyStyle(daysLeft);

  return nextFunding ? (
    <div
      className={`flex mb-3 items-center gap-3 p-2 rounded-sm border ${urgency.containerClass}`}
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
    <div
      className={
        "flex mb-3 items-center gap-3 p-2 rounded-sm border bg-(--color-neutral-bg) border-(--color-neutral-border)"
      }
    >
      <div className="flex-1 min-w-0">
        <p className={"text-sm font-medium text-(--color-neutral-text)"}>
          No upcoming funding
        </p>
        <p className={"text-xs text-(--color-neutral-text)"}>
          Add funding on the project page
        </p>
      </div>
    </div>
  );
}
