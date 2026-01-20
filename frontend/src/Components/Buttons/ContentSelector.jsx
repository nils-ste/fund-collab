import { useState, useContext } from "react";
import { getContent, postContent } from "../../API/content";
import { ContContext } from "../../Context/contentContext";

export default function ContentSelector({projectId}) {
  const { setContent } = useContext(ContContext);
  const [contentData, setContentData] = useState({
    section_type: "",
    text_box: "",
    permission_editing: 0,
    permission_reading: 0,
  });

  function handleChange(e) {
    const { value } = e.target;
    setContentData((prev) => ({...prev, section_type: value}));
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
        permission_editing: 0,
        permission_reading: 0,
      });
    } catch (err) {"Error creating content:", err}
  }

  return (
    <form className="flex mb-5 max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Add new Section
        </label>

        <select
          id="countries"
          defaultValue=""
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Choose Section Type
          </option>
          <option value="Directors Statement">Directors Statement</option>
          <option value="Synopsis">Synopsis</option>
          <option value="Production Statement">Production Statement</option>
          <option value="Social Impact">Social Impact</option>
        </select>
      </div>
      <button
        type="submit"
        className="m-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
