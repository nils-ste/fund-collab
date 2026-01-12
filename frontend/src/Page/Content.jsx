import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getContent, deleteContent } from "../API/content";
import ContentForm from "../Components/Forms/ContentForm";

export default function Content() {
  const { projectId } = useParams(); 
  const id = Number(projectId); 
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
    try {
      await deleteContent(projectId, contentId);
      const updated = await getContent(projectId);
      setContent(updated.length ? [...updated] : []);
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

  return (
    <>
      {printable}
      <ContentForm projectId={projectId} setContent={setContent} />
    </>
  );
}
