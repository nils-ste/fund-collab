import { useState } from "react";

export default function DeleteModal({ setIsOpen, title, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      setIsOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-(--color-primary) rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-lg font-semibold text-(--color-font-primary) mb-2">
          Delete {title}?
        </h2>

        <p className="text-(--color-font-secondary) text-sm mb-6">
          This action cannot be undone. Are you sure?
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-(--color-button-font) bg-(--color-button) rounded-lg hover:bg-(--color-button-hover)"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-(--color-button-font) bg-(--color-delete) rounded-lg hover:bg-(--color-delete-hover)"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
