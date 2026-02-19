import { useState, useContext } from "react";
import { getFunding, deleteFunding } from "../API/funding";
import { useParams } from "react-router";
import FundingForm from "../Components/Forms/FundingForm";
import { FundingContext } from "../Context/fundingContext";
import FundingCard from "../Components/Cards/FundingCard";
import Accordion from "../Components/Buttons/Accordion";

export default function Funding() {
  const { projectId } = useParams();
  const { funding, setFunding } = useContext(FundingContext);
  const [selectedFundingId, setSelectedFundingId] = useState(null);

  const projectFunding = funding.filter(
    (f) => f.project_id === Number(projectId),
  );

  async function handleDelete(fundingId) {
    try {
      await deleteFunding(projectId, fundingId);
      setFunding((prev) => prev.filter((f) => f.id !== fundingId));
    } catch (err) {
      console.log("Error deleting project:", err);
    }
  }

  const [open, setOpen] = useState(false);

  const [modalFunding, setModalFunding] = useState(false);

  function closeModal() {
    setModalFunding(false);
  }

  const sortedFunding = [...projectFunding].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline),
  );

  function isSameOrAfterToday(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date >= today;
  }

  function isBeforeToday(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date < today;
  }

  const upcoming = sortedFunding.filter((f) => isSameOrAfterToday(f.deadline));
  const past = sortedFunding.filter((f) => isBeforeToday(f.deadline));

  return (
    <>
      {/* Trigger */}
      <div className="flex-none px-4 ">
        <button
          onClick={() => setOpen(true)}
          className="text-(--color-button-font) bg-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          aria-label="Open funding drawer"
        >
          Funding
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
        className={`fixed top-0 right-0 z-40 h-screen w-80 bg-(--color-primary) p-4
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex px-4 text-(--color-font-primary) items-center justify-between my-4">
          <h5 className="text-base font-semibold text-(--color-font-primary)">
            Funding
          </h5>

          <button
            onClick={() => setOpen(false)}
            className="text-(--color-font-secondary) hover:text-(--color-font-primary) rounded-lg w-8 h-8 inline-flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        {/*Trigger add funding modal inside the Funding drawer*/}
        <div className="px-4">
        <button
          onClick={() => setModalFunding(true)}
          className="mb-2 px-3 py-1 text-sm font-medium text-(--color-button-font) bg-(--color-button) rounded-md hover:bg-(--color-button-hover) focus:outline-none focus:ring-2 focus:ring-(--color-button-focus)"
          aria-label="Edit project"
        >
          Add funding
        </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
          <Accordion title="Upcoming">
            {upcoming.map((fund) => (
              <FundingCard
                key={fund.id}
                fund={fund}
                handleDelete={handleDelete}
                setModalFunding={setModalFunding}
                setSelectedFundingId={setSelectedFundingId}
              />
            ))}
          </Accordion>
          <Accordion title="Past" openOnRender={false}>
            {past.map((fund) => (
              <FundingCard
                key={fund.id}
                fund={fund}
                handleDelete={handleDelete}
                setModalFunding={setModalFunding}
                setSelectedFundingId={setSelectedFundingId}
              />
            ))}
          </Accordion>
        </div>
      </div>
      {modalFunding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ease-out">
          <div className="bg-(--color-primary) p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow">
            {/* Close Button */}
            <button
              onClick={() => {
                closeModal();
                setSelectedFundingId(null);
              }}
              className="absolute top-2 right-2 text-(--color-font-secondary) hover:text-(--color-font-primary) dark:hover:text-(--color-primary) text-lg font-bold"
            >
              ✕
            </button>

            {/* Update Form */}
            <FundingForm
              projectId={projectId}
              fundings={funding}
              fundingId={selectedFundingId}
              setFunding={setFunding}
              setSelectedFundingId={setSelectedFundingId}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
}
