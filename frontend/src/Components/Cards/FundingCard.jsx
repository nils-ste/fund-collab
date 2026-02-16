export default function FundingCards({
  fund,
  handleDelete,
  setModalFunding,
  setSelectedFundingId,
}) {
  return (
    <div
      className="mb-4 max-w-sm p-6 bg-(--color-primary) border-t border-(--color-border-primary)"
    >
      {" "}
      <h6 className="mb-2 text-m text-(--color-font-primary">
        {fund.title}
      </h6>
      <p className="mb-2 text-sm text-(--color-font-secondary)">
        Deadline: {fund.deadline}
      </p>
      <p className="mb-2 text-sm text-(--color-font-secondary)">
        Requirements: {fund.requirements}
      </p>
      <a
        href={fund.hyperlink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-(--color-button) underline font-medium hover:no-underline"
      >
        Website
      </a>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            setModalFunding(true);
            setSelectedFundingId(fund.id);
          }}
          className="px-4 py-2 text-sm font-medium text-(--color-font-primary) bg-(--color-primary) border border-(--color-border-primary) rounded-lg hover:bg-(--color-primary-hover)"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(fund.id)}
          className="px-4 py-2 text-sm font-medium text-(--color-primary) bg-(--color-button) rounded-lg hover:bg-(--color-button-hover)"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
