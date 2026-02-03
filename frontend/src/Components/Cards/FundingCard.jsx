export default function FundingCards({
  fund,
  handleDelete,
  setModalFunding,
  setSelectedFundingId,
}) {
  return (
    <div
      className="mb-4 max-w-sm p-6 bg-white border-t border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-500 "
    >
      {" "}
      <h6 className="mb-2 text-m text-gray-500 dark:text-gray-300">
        {fund.title}
      </h6>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        Deadline: {fund.deadline}
      </p>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        Requirements: {fund.requirements}
      </p>
      <a
        href={fund.hyperlink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline font-medium hover:no-underline"
      >
        Website
      </a>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            setModalFunding(true);
            setSelectedFundingId(fund.id);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(fund.id)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
