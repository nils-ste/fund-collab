import "./App.css";
import Projects from "./Projects/Projects";
import Content from "./Content/Content";

function App() {
  return (
    <>
      <Projects userId={1} />
      <Content projectId={1} />
    </>
  );
}

export default App;
