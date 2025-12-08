import { useState, useEffect } from 'react'
import './App.css'
import Projects from "./Projects"
import ProjectsForm from "./ProjectsForm"

function App() {

  const [projects, setProjects] = useState([])
  let userId = 1
  const url= `https://fund-collab.onrender.com/users/1/projects/`

  async function fetchProjects() {
    const res = await fetch(url)
    const data = await res.json()
    setProjects(data)
  }

  useEffect(() => {fetchProjects(), []})

  return (
    <>
      <Projects projects={projects}  url={url}/>
      <ProjectsForm fetchProjects={fetchProjects} />
    </>
  )
}

export default App
