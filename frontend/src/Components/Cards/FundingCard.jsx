import StatusFunding from "../Badges/StatusFunding";

export default function FundingCards({
  fund,
  handleDelete,
  setModalFunding,
  setSelectedFundingId,
}) {
  return (
    <div
      className="mb-4 max-w-sm p-6 text-(--color-font-primary) bg-(--color-primary) border-t border-(--color-border-primary)"
    >
      {" "}
      <div className="flex justify-between items-center mb-3">
      <h6 className="text-m text-(--color-font-primary">
        {fund.title}
      </h6>
      <StatusFunding status={fund.status} />
      </div>
      <p className="mb-2 text-sm text-(--color-font-secondary)">
        Deadline: {fund.deadline}
      </p>
      <a
        href={fund.hyperlink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-(--color-button) underline font-medium hover:no-underline"
      >
        Website
      </a>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            setModalFunding(true);
            setSelectedFundingId(fund.id);
          }}
          className="px-4 py-2 text-sm font-medium text-(--color-button-font) bg-(--color-button) rounded-lg hover:bg-(--color-button-hover)"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(fund.id)}
          className="px-4 py-2 text-sm font-medium text-(--color-button-font) bg-(--color-button) rounded-lg hover:bg-(--color-button-hover)"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
