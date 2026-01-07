import { useNavigate } from "react-router";
import "./App.css";

function App() {
  const navigate = useNavigate()
  return (
    <>
    <button className="homepageRoute" onClick={() => navigate("/projects")}>Go to Projects</button>
    <button className="homepageRoute" onClick={() => navigate("/content")}>Go to Content</button>
    </>
  );
}

export default App;
