import { useState, useEffect } from 'react'
import './App.css'
import Projects from "./Projects"
import ProjectsForm from "./ProjectsForm"

function App() {

  const [projects, setProjects] = useState([])
  let user_id = 1

  async function fetchProjects() {
    const res = await fetch(`https://fund-collab.onrender.com/users/1/projects/`)
    const data = await res.json()
    setProjects(data)
  }

  useEffect(() => {fetchProjects(), []})

  return (
    <>
      <Projects projects={projects} />
      <ProjectsForm fetchProjects={fetchProjects} />
    </>
  )
}

export default App
