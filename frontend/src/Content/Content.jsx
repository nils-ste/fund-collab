import { useState, useEffect } from "react";
import { getContent, deleteContent } from "../API/content";

export default function Content({ projectId }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getContent(projectId);
        setContent(data);
      } catch {
        console.log("Error");
      }
    }
    fetchContent();
  }, [projectId]);

  async function handleDelete(contentId) {
    let updated = content
    try {
      await deleteContent(projectId, contentId);
      updated.length > 1 ? updated = await getContent(projectId): updated = [];
      setContent(updated);
    } catch (err) {
      console.log("Error deleting project:", err);
    }
  }

  const printable = content.map((cont) => (
    <div key={cont.id}>
      <p>{cont.text_box}</p>
      <button onClick={() => handleDelete(cont.id)}>x</button>
    </div>
  ));

  return <>{printable}</>;
}
