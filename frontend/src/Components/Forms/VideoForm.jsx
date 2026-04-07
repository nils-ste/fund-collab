import { useState, useContext } from "react";
import { getContent, postContent } from "../../API/content";
import { ContContext } from "../../Context/contentContext";
import TextInput from "../Inputs/TextInput";

export default function VideoForm({ projectId, setAddVideo, addVideo }) {
  const { setContent } = useContext(ContContext);
  const [contentData, setContentData] = useState({
    section_type: "",
    text_box: "",
    category: "video",
  });

  function handleChange(e) {
    const value = e.target.value;

    const selected = sectionOptions.find((opt) => opt.value === value);

    setContentData((prev) => ({
      ...prev,
      section_type: value,
      order: selected.order,
      category: "video",
    }));
  }

  function handleChangeLink(e) {
    const { name, value } = e.target;

    setContentData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postContent(projectId, contentData);
      const updated = await getContent(projectId);
      setContent(updated.length ? [...updated] : []);
      setAddVideo(false);
    } catch (err) {
      ("Error creating content:", err);
    }
  }

  const sectionOptions = [
    { label: "Trailer", value: "Trailer", order: 1 },
    { label: "Snippet", value: "Snippet", order: 2 },
    { label: "Working Version", value: "Working Version", order: 3 },
    { label: "Final Version", value: "Final Version", order: 4 },
  ];

  return (
    addVideo && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-(--color-secondary) rounded-xl shadow-lg w-full max-w-md p-6 mx-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <label
                htmlFor="Roles"
                className="block text-m font-medium text-(--color-font-primary)"
              >
                Add Video
              </label>

              <button
                type="button"
                onClick={() => setAddVideo(false)}
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
                Choose Video Type
              </option>

              {sectionOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <TextInput
              name="text_box"
              inputLabel="Vimeo Link:"
              data={contentData.text_box}
              handleChange={handleChangeLink}
            />
            <div>
              <button
                type="submit"
                className="mt-2 text-(--color-button-font) bg-(--color-button) border border-(--color-button) hover:bg-(--color-button-hover)
            focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
