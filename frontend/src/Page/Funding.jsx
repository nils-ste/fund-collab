import { useState, useEffect } from "react";
import { getFunding, deleteFunding } from "../API/funding";
import FundingForm from "../Components/Forms/FundingForm";

export default function Funding({ projectId }) {
  const [funding, setFunding] = useState([]);

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

  return (
    <>
      {printable}
      <FundingForm projectId={projectId} setFunding={setFunding} />
    </>
  );
}
