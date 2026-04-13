import { useState } from "react";
import { postFile } from "../../API/file";

export default function FileForm({ projectId, onFileSuccess }) {
  const [file, setFile] = useState("");
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
      const data = await postFile(projectId, formData);
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
    }
  }

  return (
    <div>
      <h2>upload file</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label>Upload File</label>
        <input type="file" onChange={handleChange}></input>
        <button type="submit" disabled={loading}>
          {loading ? "uploading" : "upload"}
        </button>
      </form>
    </div>
  );
}
