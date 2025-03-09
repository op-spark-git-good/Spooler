// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const ProjectForm = () => {
//   // axios post request containing form data
//   const createProject = (q) => {
//     axios
//       .post("/api/projects", q)
//       .done()
//   };

//   // form submission handler
//   const submitForm = (e) => {
//     // prevent default form submission
//     e.preventDefault()
//     // capture inputs from form
//     const formData = new FormData(e.target)
//     // convert to a js object
//     const newProject = Object.fromEntries(formData)
//     // post new project to db
//     createProject(newProject)
//     .then((res) => {
//       //confirm that project posted
//       //check status code of res
//       console.alert("New Project Created");
//     })
//     .catch((err) => {
//       console.alert("Failed to create Project");
//       console.error(err);
//     });
//   }
//   // actual html for the form
//   return(
//     <form onSubmit={submitForm}>
//       <label>Project Name</label>
//       <input type="text" name="name" placeholder="Enter Project Name" />
//     </form>
//   )
// }
import React, { useState } from "react";

const DynamicForm = ({ submitData }) => {
  const [categories, setCategories] = useState({
    notions: [],
    patterns: [],
    fabrics: [],
    tasks: []
  });
  const [project, setProj] = useState({
    name: '',
    description: '',
    owner: '',
  });

  //ON SUBMIT: extend categories to proj

  const handleAddField = (category) => {
    setCategories((prevState) => ({
      ...prevState,
      [category]: [...prevState[category], ""], 
    }));
  };

  const handleInputChange = (category, index, value) => {
    setCategories((prevState) => {
      const updatedInputs = [...prevState[category]];
      updatedInputs[index] = value; 
      return {
        ...prevState,
        [category]: updatedInputs,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(categories); // Submit the categories with their arrays
  };

  return (
    <form onSubmit={handleSubmit}>
      
      {Object.entries(categories).map(([category, inputs]) => (
        <div key={category}>
          <h3>{category}</h3>
          {inputs.map((input, index) => (
            <div key={index}>
              <input
                type="text"
                value={input}
                onChange={(e) =>
                  handleInputChange(category, index, e.target.value)
                }
                placeholder={`Enter value for ${category}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField(category)}
          >
            Add Field
          </button>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm
