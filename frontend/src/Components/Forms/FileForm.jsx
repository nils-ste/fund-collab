import { useState } from "react";
import { postFile } from "../../API/file";
import { Upload } from "lucide-react";

export default function FileForm({ projectId, onFileSuccess, hasPermission }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setError("No file found");
      return;
    }
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      await postFile(projectId, formData);
      setFile(null);
      onFileSuccess();
    } catch (err) {
      setError(err.message || "Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError("");
    }
  }

  if (!hasPermission) return null;

  return (
    <div className="mx-5 md:mx-0 mb-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-(--color-button) hover:text-(--color-button-font) border border-(--color-button) hover:bg-(--color-button-hover) focus-within:ring-4 focus-within:ring-(--color-button-focus) font-medium rounded-lg px-4 py-2">
          <Upload className="w-4 h-4" />
          <span>{file ? file.name : "Choose File"}</span>
          <input type="file" onChange={handleChange} className="hidden" />
        </label>
        {file && (
          <button
            type="submit"
            disabled={loading}
            className="text-sm text-(--color-button) hover:text-(--color-button-font) border border-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg px-4 py-2"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}