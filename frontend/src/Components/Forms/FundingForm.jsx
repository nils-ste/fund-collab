import { useState } from "react";
import { getFunding, postFunding } from "../../API/funding";
import TextInput from "../Inputs/TextInput";

export default function FundingForm({ projectId, setFunding }) {
  const [fundingData, setFundingData] = useState({
    title: "",
    deadline: "",
    requirements: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFundingData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postFunding(projectId, fundingData);
      const updated = await getFunding(projectId);
      setFunding(updated.length ? [...updated] : []);
      setFundingData({
        title: "",
        deadline: "",
        requirements: "",
      });
    } catch (err) {
      console.log("Error posting funding", err);
    }
  }

  return (
    <form
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onSubmit={handleSubmit}
    >
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
        Submit
      </button>
    </form>
  );
}
