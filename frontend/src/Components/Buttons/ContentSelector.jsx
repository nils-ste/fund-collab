import { useState, useContext } from "react";
import { getContent, postContent } from "../../API/content";
import { ContContext } from "../../Context/contentContext";

export default function ContentSelector({ projectId }) {
  const { setContent } = useContext(ContContext);
  const [contentData, setContentData] = useState({
    section_type: "",
    text_box: "",
    permission_editing: null,
    permission_reading: null,
  });

  function handleChange(e) {
    const { value } = e.target;
    setContentData((prev) => ({ ...prev, section_type: value }));
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
        permission_editing: null,
        permission_reading: null,
      });
    } catch (err) {
      ("Error creating content:", err);
    }
  }

  return (
    <form className="flex gap-4 mb-5 max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="Roles"
          className="block mb-2 text-sm font-medium text-(--color-font-primary)"
        >
          Add new Section
        </label>

        <select
          id="Roles"
          defaultValue=""
          onChange={handleChange}
          className="bg-(--color-secondary) border border-(--color-border-primary) text-(--color-font-primary) text-sm rounded-lg
                   focus:ring-(--color-button-focus) focus:border-(--color-button-focus) block w-full p-2.5"
        >
          <option value="" disabled>
            Choose Section Type
          </option>
          <option value="Tagline">Tagline</option>
          <option value="Directors Statement">Directors Statement</option>
          <option value="Synopsis">Synopsis</option>
          <option value="Production Statement">Production Statement</option>
          <option value="Social Impact">Social Impact</option>
        </select>
      </div>
      <button
        type="submit"
        className="self-end text-(--color-button-font) bg-(--color-button) border border-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
