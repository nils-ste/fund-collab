export default function StatusBadge({ status }) {
  const statusConfig = {
    development: {
      label: "Development",
      className: "bg-slate-100 text-slate-700 border-slate-200",
    },
    "pre-production": {
      label: "Pre-Production",
      className: "bg-amber-100 text-amber-700 border-amber-200",
    },
    production: {
      label: "Production",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    "post-production": {
      label: "Post-Production",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    distribution: {
      label: "Distribution",
      className: "bg-purple-100 text-purple-700 border-purple-200",
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
