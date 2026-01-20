import { useState } from "react";
import { getContent, postContent } from "../../API/content";

export default function ContentForm({ projectId, setContent, sectionType }) {
  const [contentData, setContentData] = useState({
    section_type: sectionType,
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
        text_box: "",
        permission_editing: 0,
        permission_reading: 0,
      });
    } catch (err) {
      console.log("Error posting content", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-m p-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your {sectionType}
      </label>
        <textarea
        id="message"
        name="text_box"
        rows="10"
        value={contentData.text_box}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`Enter your ${sectionType}`}
        onChange={handleChange}
      />
      
        <button type="submit">Submit</button>
      
    </form>
  );
}
