import { useState, useContext } from "react";
import { getContent, putContent } from "../../API/content";
import { ContContext } from "../../Context/contentContext";

export default function ContentItem({ cont, onDelete, projectId }) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  function toggleEdit() {
    setIsReadOnly((prev) => !prev);
  }

  const { setContent } = useContext(ContContext);

  const [contentData, setContentData] = useState({
    section_type: cont.section_type,
    text_box: cont.text_box,
    permission_editing: null,
    permission_reading: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setContentData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await putContent(projectId, contentData, cont.id);
      const updated = await getContent(projectId);
      setContent(updated.length ? [...updated] : []);
    } catch (err) {
      console.log("Error updating content", err);
    }
    toggleEdit();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-m m-5 p-8 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"
      key={cont.id}
    >
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your {cont.section_type}
        </label>
        <div className="flex gap-2">
          {isReadOnly && (
            <button
              type="button"
              onClick={() => toggleEdit()}
              className="flex text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete(cont.id)}
            className="flex text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Delete
          </button>
        </div>
      </div>
      <textarea
        id={cont.id}
        name="text_box"
        rows="10"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`Enter your ${cont.section_type}`}
        value={contentData.text_box}
        readOnly={isReadOnly}
        onChange={handleChange}
      ></textarea>

      {!isReadOnly && (
        <button
          type="submit"
          className=" text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Update
        </button>
      )}
    </form>
  );
}
