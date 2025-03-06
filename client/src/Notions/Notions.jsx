import React, { useState, useEffect } from "react";
import axios from 'axios'
import NotionsList from "./NotionsList";
import NotionsForm from "./NotionsForm";
import Notion from './Notion.jsx'
import SearchApi from "./SearchApi";
const Notions = (props) => {
  const [notions, setNotions] = useState([]);

  // Function to fetch all notions from the backend
  const getAllNotionsDB = () => {
    axios.get('/api/notions')
      .then((response) => {
        setNotions(response.data); // Update the state with the fetched notions
      })
      .catch((err) => {
        console.error('Error fetching notions:', err);
      });
  };

  useEffect(() => {
    // Fetch all notions when the component mounts
    getAllNotionsDB();
  }, []);

  return (
    <div>
      <h2>Notion List</h2>
      <SearchApi getAllNotionsDB={getAllNotionsDB} />
      {notions.length > 0 ? (
        <ul>
          {notions.map((notion) => (
            <li key={notion._id}>
              <Notion
                title={notion.title}
                brand={notion.brand}
                color={notion.color}
                image={notion.image}
                id={notion._id}
                getAllNotionsDB={getAllNotionsDB}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No notions found.</p>
      )}

    </div>

  );
};
export default Notions