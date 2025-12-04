import { useState } from 'react'
import './App.css'
import Projects from "./Projects"
import ProjectsForm from "./ProjectsForm"

function App() {

  return (
    <>
      <Projects userId={1}/>
      <ProjectsForm/>
    </>
  )
}

export default App
