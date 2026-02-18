export default function StatusBadge({ status }) {
  const statusConfig = {
    development: {
      label: "Development",
      className: "bg-(--color-development-bg) text-(--color-development-text) border-(--color-development-border)",
    },
    "pre-production": {
      label: "Pre-Production",
      className: "bg-(--color-pre-production-bg) text-(--color-pre-production-text) border-(--color-pre-production-border)",
    },
    production: {
      label: "Production",
      className: "bg-(--color-production-bg) text-(--color-production-text) border-(--color-production-border)",
    },
    "post-production": {
      label: "Post-Production",
      className: "bg-(--color-post-production-bg) text-(--color-post-production-text) border-(--color-post-production-border)",
    },
    distribution: {
      label: "Distribution",
      className: "bg-(-color-distribution-bg) text-(--color-distribution-text) border-(--color-distribution-border)",
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
