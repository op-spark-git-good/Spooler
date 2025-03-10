import React, { useState } from "react";
import axios from "axios";

import CategoryForm from "./CategoryForm";

const ProjectForm = () => {

  const [project, setProject] = useState({
    name: '',
    description: '',
  });
  
  const [tasks, setTasks] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [notions, setNotions] = useState([]);

  const clearInputs = () => {
    setProject({name: "", description: "" });
    setTasks([]);
    setPatterns([]);
    setFabrics([]);
    setNotions([]);
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProject((prev) => ({...prev, [name]: value}));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submittedProject = { ...project, tasks, patterns, fabrics, notions };
    console.log(submittedProject);
    try {
      await axios.post('/api/projects/', submittedProject);
      console.alert('Project created');
      clearInputs();
    } catch (err) {
      console.alert('Failed to create Project')
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="project-form-name">
      <label>Project Name</label>
      <input type="text" name="name" value={project.name} onChange={handleInputChange} required />
      </div>
      <div className="project-form-description">
      <label>Description</label>
      <input type="text" name="description" value={project.description} onChange={handleInputChange} />
      </div>
      <div className="project-form-categories">
      <CategoryForm  category="tasks" items={tasks} setItems={setTasks} fields={["name", "priority"]} />
      <CategoryForm  category="patterns" items={patterns} setItems={setPatterns} fields={["name", "description"]} />
      <CategoryForm  category="fabrics" items={fabrics} setItems={setFabrics} fields={["name", "description", "quantity"]} />
      <CategoryForm  category="notions" items={notions} setItems={setNotions} fields={["name", "description", "quantity"]} />
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm
