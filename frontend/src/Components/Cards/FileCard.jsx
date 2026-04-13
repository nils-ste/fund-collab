import { Download, Trash2 } from "lucide-react";
import { getFile } from "../../API/file";

export default function FileCard({ file, projectId, onDelete, hasPermission }) {
  const extension = file.file_name.split(".").pop().toUpperCase();

  async function handleDownload() {
    try {
      const data = await getFile(projectId, file.id);
      window.open(data.url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
    }
  }

  return (
    <div className="w-72 m-2 p-3 bg-(--color-primary) border border-(--color-border-primary) rounded-sm shadow-sm flex items-center gap-3">
      <span className="text-xs font-semibold text-(--color-button) border border-(--color-button) rounded px-1.5 py-0.5 shrink-0">
        {extension}
      </span>

      <p
        className="text-sm font-medium text-(--color-font-primary) truncate flex-1"
        title={file.file_name}
      >
        {file.file_name}
      </p>

      <div className="flex gap-1 shrink-0">
        <button
          onClick={handleDownload}
          aria-label="Download file"
          className="flex text-(--color-button) hover:text-(--color-button-font) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:(--color-button-focus) font-medium rounded-lg text-sm px-3 py-2"
        >
          <Download className="w-4 h-4" />
        </button>
        {hasPermission && (
          <button
            onClick={() => onDelete(file.id)}
            aria-label="Delete file"
            className="flex text-(--color-button) hover:text-(--color-button-font) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:(--color-button-focus) font-medium rounded-lg text-sm px-3 py-2"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}