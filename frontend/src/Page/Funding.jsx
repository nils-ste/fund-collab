import { useState, useEffect, useContext } from "react";
import { getFunding, deleteFunding } from "../API/funding";
import { useParams } from "react-router";
import FundingForm from "../Components/Forms/FundingForm";
import { FundingContext } from "../Context/fundingContext";
import FundingCards from "../Components/Cards/FundingCards";

export default function Funding() {
  const { projectId } = useParams();
  const { funding, setFunding } = useContext(FundingContext);

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
  

  return (
    <>
      <FundingForm projectId={projectId} setFunding={setFunding} />
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

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <FundingCards handleDelete={handleDelete}/>
        </div>
      </div>
    </>
  );
}
