export default function UserRole({ role }) {
  const statusConfig = {
    admin: {
      label: "Admin",
      className: "bg-(--color-development-bg) text-(--color-development-text) border-(--color-development-border)",
    },
    viewer: {
      label: "Viewer",
      className: "bg-(--color-development-bg) text-(--color-development-text) border-(--color-development-border)",
    },
    editor: {
      label: "Editor",
      className: "bg-(--color-development-bg) text-(--color-development-text) border-(--color-development-border)",
    },
}
    

  const config = statusConfig[role?.toLowerCase()] || {
    label: role,
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
