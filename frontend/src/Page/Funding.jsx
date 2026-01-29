import { useState, useEffect, useContext } from "react";
import { getFunding, deleteFunding } from "../API/funding";
import { useParams } from "react-router";
import FundingForm from "../Components/Forms/FundingForm";
import { FundingContext } from "../Context/fundingContext";
import FundingCard from "../Components/Cards/FundingCard";

export default function Funding() {
  const { projectId } = useParams();
  const { funding, setFunding } = useContext(FundingContext);
  const [selectedFundingId, setSelectedFundingId] = useState(null);

  useEffect(() => {
    async function fetchFunding() {
      try {
        const data = await getFunding(projectId);
        setFunding(data);
      } catch {
        console.log("Error");
      }
    }
    fetchFunding();
  }, [projectId]);

  async function handleDelete(contentId) {
    try {
      await deleteFunding(projectId, contentId);
      const updated = await getFunding(projectId);
      setFunding(updated.length ? [...updated] : []);
    } catch (err) {
      console.log("Error deleting project:", err);
    }
  }

  const printable = funding.map((fund) => (
    <div key={fund.id}>
      <p>{fund.title}</p>
      <button onClick={() => handleDelete(fund.id)}>x</button>
    </div>
  ));

  const [open, setOpen] = useState(false);

  const [modalFunding, setModalFunding] = useState(false);

  function closeModal() {
    setModalFunding(false);
  }

  return (
    <>
      {/* Trigger */}
      <div className="flex justify-end px-4">
        <button
          onClick={() => setOpen(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          aria-label="Open funding drawer"
        >
          Show Funding
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen w-80 bg-white dark:bg-gray-800 p-4
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-base font-semibold text-gray-500 dark:text-gray-400">
            Funding
          </h5>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        {/*Trigger add funding modal inside the Funding drawer*/}
        <button
          onClick={() => setModalFunding(true)}
          className="px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Edit project"
        >
          Add funding
        </button>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <FundingCard
            handleDelete={handleDelete}
            setModalFunding={setModalFunding}
            setSelectedFundingId={setSelectedFundingId}
          />
        </div>
      </div>
      {modalFunding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ease-out">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow dark:bg-gray-800 dark:text-white">
            {/* Close Button */}
            <button
              onClick={() => {
                closeModal();
                setSelectedFundingId(null);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Add funding</h3>

            {/* Update Form */}
            <FundingForm
              projectId={projectId}
              fundings={funding}
              fundingId={selectedFundingId}
              setFunding={setFunding}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
}
