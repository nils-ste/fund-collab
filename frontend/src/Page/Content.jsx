import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { getContent, deleteContent } from "../API/content";
import { ContContext } from "../Context/contentContext";
import ContentForm from "../Components/Forms/ContentForm";
import ContentSelector from "../Components/Buttons/ContentSelector";

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

  const [contentSection, setContentSection] = useState(true);

  const printable = content.map((cont) => (
    <div
      className="max-w-m p-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
      key={cont.id}
    >
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your {cont.section_type}
      </label>
      <textarea
        id={cont.id}
        rows="10"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`Enter your ${cont.section_type}`}
        value={cont.text_box}
        readOnly={contentSection}
      ></textarea>

      <button
        type="button"
        onClick={(prev) => setContentSection(!prev)}
        className=" text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Edit {cont.section_type}
      </button>
      <button
        type="button"
        onClick={() => handleDelete(cont.id)}
        className=" text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        x
      </button>
    </div>
  ));

  return (
    <>
    <ContentSelector projectId={fetchId}/>
      {printable}

      <ContentForm
        projectId={fetchId}
        setContent={setContent}
        sectionType={"directors statement"}
      />
    </>
  );
}
