import { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { getContent, deleteContent } from "../API/content";
import { ContContext } from "../Context/contentContext";
import ContentSelector from "../Components/Buttons/ContentSelector";
import ContentCard from "../Components/Cards/ContentCard";
import Funding from "./Funding";

export default function Content() {
  const { projectId } = useParams();
  const fetchId = Number(projectId);
  const { content, setContent } = useContext(ContContext);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getContent(fetchId);
        setContent(data);
      } catch {
        console.log("Error");
      }
    }
    fetchContent();
  }, [fetchId]);

  async function handleDelete(contentId) {
    try {
      await deleteContent(fetchId, contentId);
      const updated = await getContent(fetchId);
      setContent(updated.length ? [...updated] : []);
    } catch (err) {
      console.log("Error deleting project:", err);
    }
  }

  return (
    <>
      <Funding />
      <ContentSelector projectId={fetchId} />
      {content.map((cont) => (
        <ContentCard
          key={cont.id}
          cont={cont}
          onDelete={handleDelete}
          projectId={fetchId}
        />
      ))}
      {/*<ContentForm
        projectId={fetchId}
        setContent={setContent}
        sectionType={"directors statement"}
      />*/}
    </>
  );
}
