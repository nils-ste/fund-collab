export default function DeleteModal({ setModalState, deleteContent, deleteFunction }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ease-out">
      <div className="bg-(--color-primary) p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow">
        <button
          className="absolute top-2 right-2 text-(--color-font-secondary) hover:text-(--color-font-primary) dark:hover:text-(--color-primary) text-lg font-bold"
          onClick={() => setModalState(false)}
        >
          ✕
        </button>
        <h1>Caution!</h1>
        <p>You are about to delete {deleteContent}. Any delete is final. Do you want to proceed?</p>
        <button onClick={() => deleteFunction(deleteContent.id)}>Delete</button>
      </div>
    </div>
  );
}
