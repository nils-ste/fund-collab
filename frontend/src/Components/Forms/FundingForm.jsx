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
    requirements: funding?.requirements || "",
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
          requirements: "",
        });
      }
      if (closeModal) closeModal();
    } catch (err) {
      console.error("Error submitting project:", err);
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
        name="requirements"
        inputLabel="Enter Requirements:"
        data={fundingData.requirements}
        handleChange={handleChange}
      />
      <TextInput
        name="hyperlink"
        inputLabel="Link to Website:"
        data={fundingData.hyperlink}
        handleChange={handleChange}
      />
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
