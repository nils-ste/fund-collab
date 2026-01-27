import { useContext, useState } from "react";
import { FundingContext } from "../../Context/fundingContext";
import { useParams } from "react-router";
import FundingForm from "../Forms/FundingForm";

export default function FundingCards({ handleDelete }) {
  const { funding, setFunding } = useContext(FundingContext);
  const [showForm, setShowForm] = useState(false);
  const { projectId } = useParams();
  const fundingCont = funding.map((fund) => (
    <>
      <div
        key={fund.id}
        className="mb-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 "
      >
        {" "}
        <h6 className="mb-2 text-m text-gray-500 dark:text-gray-400">
          {fund.title}
        </h6>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Deadline: {fund.deadline}
        </p>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Requirements: {fund.requirements}
        </p>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-medium hover:no-underline"
        >
          Website
        </a>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowForm(true)}
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
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ease-out">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow dark:bg-gray-800 dark:text-white">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-lg font-bold"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <FundingForm
              projectId={projectId}
              fundings={funding}
              fundingId={fund.id}
              setFunding={setFunding}
              closeModal={() => setShowForm(false)}
              key={fund.id}
            />
          </div>
        </div>
      )}
    </>
  ));

  return <>{fundingCont}</>;
}
