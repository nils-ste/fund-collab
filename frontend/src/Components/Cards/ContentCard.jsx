import { useState, useContext } from "react";
import { getContent, putContent } from "../../API/content";
import { ContContext } from "../../Context/contentContext";
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  ClipboardCheck,
  Copy,
} from "lucide-react";

export default function ContentCard({ cont, onDelete, projectId }) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [copied, setCopied] = useState(false);
  const { setContent } = useContext(ContContext);
  const [contentData, setContentData] = useState({
    section_type: cont.section_type,
    text_box: cont.text_box,
    permission_editing: null,
    permission_reading: null,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const CONTENT_CHAR_LIMIT = 800;

  function toggleEdit() {
    setIsReadOnly((prev) => !prev);
  }

  const handleCopy = () => {
    if (!contentData.text_box) return;
    navigator.clipboard.writeText(contentData.text_box).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shouldTruncate =
    contentData.text_box && contentData.text_box.length > CONTENT_CHAR_LIMIT;
  const displayContent =
    shouldTruncate && !isExpanded
      ? contentData.text_box.slice(0, CONTENT_CHAR_LIMIT) + "..."
      : contentData.text_box;

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
      className="max-w-m m-5 rounded-sm bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"
      key={cont.id}
    >
      <div className="flex border-b border-gray-700 items-center justify-between">
        <label
          htmlFor="message"
          className="block m-5 text-m font-medium text-gray-900 dark:text-white"
        >
          Your {contentData.section_type}
        </label>
        <div className="flex m-2 gap-2">
          {isReadOnly && (
            <>
              <button
                type="button"
                onClick={handleCopy}
                className="flex text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-1 mb-2.5 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                {copied ? (
                  <ClipboardCheck className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => toggleEdit()}
                className="flex text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-1 mb-2.5 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(cont.id)}
                className="flex text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mb-2.5 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      {isReadOnly ? (
        <div>
          <div className="w-full min-h-[120px] block mb-3 p-5 text-sm text-gray-900 bg-gray-50 whitespace-pre-wrap dark:bg-gray-800 dark:text-white">
            {displayContent || (
              <span className="text-gray-400 italic">No content yet</span>
            )}
          </div>
          <div className="mb-5 flex justify-between">
            <p className="mt-2 pl-5 text-xs text-gray-400">
              {contentData.text_box.length} characters
            </p>
            {shouldTruncate && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 pr-5 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Read more
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <textarea
            id={cont.id}
            name="text_box"
            rows="10"
            className="w-full min-h-[120px] block p-5 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Enter your ${contentData.section_type}`}
            value={contentData.text_box}
            readOnly={isReadOnly}
            onChange={handleChange}
            style={{ fieldSizing: "content" }}
          ></textarea>
          <p className="mt-2 pl-5 text-xs text-gray-400">
            {contentData.text_box.length} characters
          </p>
        </div>
      )}

      {!isReadOnly && (
        <button
          type="submit"
          className="text-blue-700 hover:text-white m-3 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Update
        </button>
      )}
    </form>
  );
}
