import React, { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  //get projects from db
  const getProjects = () => {
    axios
      .get("/api/projects")
      .then(({ data }) => {
        setProjects(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(getProjects, []);
  console.log(projects)
  //create a new project
  // const createProject = (newProject) => {
  //   axios
  //     .post("/api/projects")
  //     .then(() => {
  //       //confirm that project posted?
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  const projectsHTML = projects.map((project)=>{
    return(
      <div className="project-entry" id={project._id}>
        <h1>{project.name}</h1>
        <div className="description">{project.description}</div>
        <div className="fabric-list">
          <h2>Fabrics</h2>
          <ul>
            {project.fabrics.map((fabric)=>{return(
              <li>{fabric.description}</li>
            )})}
          </ul>
        </div>
        <div className="pattern-list">
          <h2>Patterns</h2>
          <ul>
            {project.patterns.map((pattern)=>{return(
              <li>{pattern.description}</li>
            )})}
          </ul>
        </div>
        <div className="notion-list">
          <h2>Notions</h2>
          <ul>
            <li>Sample Notion A</li>
            <li>Sample Notion B</li>
            <li>Sample Notion C</li>
          </ul>
        </div>
        <div className="tasks">
          <h2>Tasks</h2>
          <ul>
            <li>Sample Task 1</li>
            <li>Sample Task 2</li>
            <li>Sample Task 3</li>
          </ul>
        </div>
      </div>

    )
  })
  return (
    <div id="projects-body">
        <h1>Sample Project Title</h1>
        {projects.map((project)=>{
    return(
      <div className="project-entry" id={project._id}>
        <h1>{project.name}</h1>
        <div className="description">{project.description}</div>
        <div className="fabric-list">
          <h2>Fabrics</h2>
          <ul>
            {project.fabrics.map((fabric)=>{return(
              <li>{fabric.description}</li>
            )})}
          </ul>
        </div>
        <div className="pattern-list">
          <h2>Patterns</h2>
          <ul>
            {project.patterns.map((pattern)=>{return(
              <li>{pattern.description}</li>
            )})}
          </ul>
        </div>
        <div className="notion-list">
          <h2>Notions</h2>
          <ul>
            <li>Sample Notion A</li>
            <li>Sample Notion B</li>
            <li>Sample Notion C</li>
          </ul>
        </div>
        <div className="tasks">
          <h2>Tasks</h2>
          <ul>
            <li>Sample Task 1</li>
            <li>Sample Task 2</li>
            <li>Sample Task 3</li>
          </ul>
        </div>
      </div>

    )
  })}
    </div>
  );
};

export default Projects;
