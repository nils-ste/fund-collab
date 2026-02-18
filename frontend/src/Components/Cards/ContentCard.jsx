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
      className="max-w-m m-5 rounded-sm bg-(--color-primary) border border-(--color-border-primary) shadow-sm"
      key={cont.id}
    >
      <div className="flex border-b border-(--color-border-primary) items-center justify-between">
        <label
          htmlFor="message"
          className="block m-5 text-m font-medium text-(--color-font-primary) dark:text-(--color-primary)"
        >
          Your {contentData.section_type}
        </label>
        <div className="flex m-2 gap-2">
          {isReadOnly && (
            <>
              <button
                type="button"
                onClick={handleCopy}
                className="flex text-(--color-button) hover:text-(--color-primary) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-3 py-2 text-center me-1 mb-2.5"
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
                className="flex text-(--color-button) hover:text-(--color-primary) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-3 py-2 text-center me-1 mb-2.5"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(cont.id)}
                className="flex text-(--color-button) hover:text-(--color-primary) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-3 py-2 text-center me-1 mb-2.5"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
      {isReadOnly ? (
        <div>
          <div className="w-full min-h-[120px] block mb-3 p-5 text-sm text-(--color-font-primary) space-pre-wrap ">
            {displayContent || (
              <span className="text-(--color-font-secondary) italic">No content yet</span>
            )}
          </div>
          <div className="mb-5 flex justify-between">
            <p className="mt-2 pl-5 text-xs text-(--color-font-secondary)">
              {contentData.text_box.length} characters
            </p>
            {shouldTruncate && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 pr-5 flex items-center gap-1 text-sm text-(--color-button) hover:text-(--color-button-hover)"
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
            className="w-full min-h-[120px] block p-5 text-sm text-(--color-font-primary) bg-gray-50 border border-(--color-border-primary)"
            placeholder={`Enter your ${contentData.section_type}`}
            value={contentData.text_box}
            readOnly={isReadOnly}
            onChange={handleChange}
            style={{ fieldSizing: "content" }}
          ></textarea>
          <p className="mt-2 pl-5 text-xs text-(--color-font-secondary)">
            {contentData.text_box.length} characters
          </p>
        </div>
      )}

      {!isReadOnly && (
        <button
          type="submit"
          className="text-(--color-button) hover:text-(--color-primary) m-3 border border-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Update
        </button>
      )}
    </form>
  );
}
