import { useState } from "react";
import { getContent, postContent } from "../API/content";

export default function ContentForm({ projectId, setContent }) {
  const [projectData, setProjectData] = useState({
    section_type: "",
    text_box: "",
    permission_editing: [],
    permission_reading: [],
  });

  
}
