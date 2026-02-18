import { useContext } from "react";
import { ContContext } from "../../Context/contentContext";

export default function TaglinePreview({ project }) {
  const { content } = useContext(ContContext);

  const projectContent = content.filter(
    (c) => c.project_id === project.id
  );

  const taglineContent = projectContent.find(
    (t) => t.section_type === "Tagline"
  );


  return (
    <p className="mt-3 mb-5 text-(--color-font-primary) text-muted-foreground text-sm line-clamp-2 min-h-[2.5rem]">
      {taglineContent? taglineContent.text_box: "No tagline added. Please add a tagline on the Content Page."}
    </p>
  );
}
