import { useState } from "react";
import { getFunding, postFunding, putFunding } from "../../API/funding";
import TextInput from "../Inputs/TextInput";

export default function FundingForm({
  projectId,
  setFunding,
  fundingId = null,
  fundings = [],
  closeModal,
  setSelectedFundingId,
}) {
  const funding = fundingId
    ? fundings.find((f) => f.id === Number(fundingId))
    : null;

  const [fundingData, setFundingData] = useState({
    title: funding?.title || "",
    deadline: funding?.deadline || "",
    hyperlink: funding?.hyperlink || "",
    status: funding?.status || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFundingData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (fundingId) {
        await putFunding(projectId, fundingData, fundingId);
      } else {
        await postFunding(projectId, fundingData);
      }
      const updated = await getFunding(projectId);
      setFunding(updated.length ? [...updated] : []);
      setSelectedFundingId(null);
      if (!fundingId) {
        setFundingData({
          title: "",
          deadline: "",
          hyperlink: "",
          status: "",
        });
      }
      if (closeModal) closeModal();
    } catch (err) {
      console.error("Error submitting funding:", err);
    }
  }

  return (
    <form
      className="text-(--color-font-primary) max-w-md mx-auto p-4 bg-(--color-primary)"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-bold mb-4">
        {fundingId ? "Update " : "Add "}funding
      </h3>
      <TextInput
        name="title"
        inputLabel="Enter Funding Title:"
        data={fundingData.title}
        handleChange={handleChange}
      />

      <TextInput
        name="hyperlink"
        inputLabel="Link to Website:"
        data={fundingData.hyperlink}
        handleChange={handleChange}
      />
      <div>
        <label
          htmlFor="status"
          className="block mb-2 text-sm text-(--color-font-primary)"
        >
          Application Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={fundingData.status}
          onChange={handleChange}
          className="mb-2 bg-(--color-secondary) border border-(--color-border-primary) text-(--color-font-primary) text-sm rounded-lg
                   focus:ring-(--color-button-focus) focus:border-(--color-button-focus) block w-full p-2.5"
        >
          <option value="" disabled>
            Choose Application Status
          </option>
          <option value="not applied">Not Applied</option>
          <option value="in application">In Application</option>
          <option value="applied">Applied</option>
        </select>
      </div>

      <label className="text-sm">
        Enter Deadline
        <input
          type="date"
          name="deadline"
          value={fundingData.deadline}
          className="bg-(--color-secondary) mb-5 border border-(--color-border-primary) text-(--color-font-primary) text-sm rounded-lg focus:ring-(--color-button-focus) focus:border-(--color-button) block w-full p-2.5"
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        className="mb-2 px-3 py-1 text-sm font-medium text-(--color-primary) bg-(--color-button) rounded-md hover:bg-(--color-button-hover) focus:outline-none focus:ring-2 focus:ring-(--color-button-focus)"
      >
        {fundingId ? "Update" : "Create"}
      </button>
    </form>
  );
}
