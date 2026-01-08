import { useState } from "react";
import { getContent, postContent } from "../../API/content";

export default function ContentForm({ projectId, setContent }) {
  const [contentData, setContentData] = useState({
    section_type: "",
    text_box: "",
    permission_editing: 0,
    permission_reading: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setContentData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postContent(projectId, contentData);
      const updated = await getContent(projectId);
      setContent(updated.length ? [...updated] : []);
      setContentData({
        section_type: "",
        text_box: "",
        permission_editing: [],
        permission_reading: [],
      });
    } catch (err) {
      console.log("Error posting content", err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Section Type
        <input
          type="text"
          name="section_type"
          value={contentData.section_type}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter Text
        <input
          type="text"
          name="text_box"
          value={contentData.text_box}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </label>
    </form>
  );
}
