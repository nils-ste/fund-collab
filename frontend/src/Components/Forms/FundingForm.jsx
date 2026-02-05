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
      setSelectedFundingId(null)
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
      className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 dark:text-white"
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
          className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
      >
        {fundingId ? "Update" : "Create"}
      </button>
    </form>
  );
}
