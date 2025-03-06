import React from 'react';
import axios from 'axios';

const Notion = ({ brand, color, image, title, id, getAllNotionsDB }) => {
  console.log(id);

  const handleDelete = () => {
    axios.delete(`/api/notions/${id}`)
      .then(() => {
        // After a successful delete, refresh the list
        getAllNotionsDB();
      })
      .catch((err) => {
        // Log the error for debugging
        console.error('Could not finish delete request:', err);

      });
  };

  return (
    <div>
      <div>{title}</div>
      <div>{brand}</div>
      <img src={image} alt={title} style={{ width: '100px', height: 'auto' }} />
      <div>{color}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Notion;