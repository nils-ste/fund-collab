import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-screen">
    <button className="homepageRoute" onClick={() => navigate("/projects")}>Go to Projects</button>
    <button className="homepageRoute" onClick={() => navigate("/content")}>Go to Content</button>
    </div>
  );
}

export default App;
