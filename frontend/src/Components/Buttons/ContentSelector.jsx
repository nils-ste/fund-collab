import { useState, useContext } from "react";
import { getContent, postContent } from "../../API/content";
import { ContContext } from "../../Context/contentContext";

export default function ContentSelector({ projectId, setAddContent, addContent }) {
  const { setContent } = useContext(ContContext);
  const [contentData, setContentData] = useState({
    section_type: "",
    text_box: "",
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
      setAddContent(false)
    } catch (err) {
      ("Error creating content:", err);
    }
  }

  return (
  addContent && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-(--color-secondary) rounded-xl shadow-lg w-full max-w-md p-6 mx-4">

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <label
              htmlFor="Roles"
              className="block text-m font-medium text-(--color-font-primary)"
            >
              Add Section
            </label>

            <button
              type="button"
              onClick={() => setAddContent(false)}
              className="text-(--color-font-secondary) hover:text-(--color-font-primary) rounded-lg w-8 h-8 inline-flex items-center justify-center"
            >
              ✕
            </button>
          </div>

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

          <button
            type="submit"
            className="mt-2 text-(--color-button-font) bg-(--color-button) border border-(--color-button) hover:bg-(--color-button-hover)
            focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2"
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  )
);}