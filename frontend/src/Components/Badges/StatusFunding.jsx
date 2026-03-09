export default function StatusFunding({ status }) {
  const statusConfig = {
    "not applied": {
      label: "Not Applied",
      className: "bg-(--color-pre-production-bg) text-(--color-pre-production-text) border-(--color-pre-production-border)",
    },
    applied: {
      label: "Applied",
      className: "bg-(--color-production-bg) text-(--color-production-text) border-(--color-production-border)",
    },
    "in application": {
      label: "In Application",
      className: "bg-(--color-post-production-bg) text-(--color-post-production-text) border-(--color-post-production-border)",
    },
    "deadline missed": {
      label: "Missed Deadline",
      className: "bg-(--color-urgent-bg) text-(--color-urgent-text) border-(--color-urgent-border)",
    },
  };

  const config = statusConfig[status?.toLowerCase()] || {
    label: status,
    className: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-lg border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
