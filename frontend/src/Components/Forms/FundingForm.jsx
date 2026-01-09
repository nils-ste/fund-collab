import { useState } from "react";
import { getFunding, postFunding } from "../../API/funding";

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
    <form onSubmit={handleSubmit}>
      <label>
        Enter Title
        <input
          type="text"
          name="title"
          value={fundingData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter Deadline
        <input
          type="text"
          name="deadline"
          value={fundingData.deadline}
          onChange={handleChange}
        />
        </label>
        <label>
        Enter Requirements
        <input
          type="text"
          name="requirements"
          value={fundingData.requirements}
          onChange={handleChange}
        />
        </label>
        <button type="submit">Submit</button>
    </form>
  );
}
