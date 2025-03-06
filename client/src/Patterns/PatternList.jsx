import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PatternList = () => {
    // State to store the list of patterns
  const [patterns, setPatterns] = useState([]);
  const [editingPattern, setEditingPattern] = useState(null); // Track the pattern being edited

    // Function to handle the "Edit" button click
  const handleEditClick = pattern => {
    setEditingPattern(pattern); // Set the pattern to be edited
  };


    // Function to handle form submission for updating a pattern
  const handleUpdateSubmit = async e => {
    e.preventDefault();// Prevent the default form submission behavior

        // Check if a pattern is selected for editing
    if (!editingPattern || !editingPattern._id) {
      console.error('Error: No pattern selected for editing!');
      return;
    }

    try {
            // Send a PUT request to update the pattern on the server
      const response = await axios.put(
        `/api/patterns/${editingPattern._id}`,
        editingPattern
      );
      console.log('Update successful:', response.data);

      // Update the patterns list in the state
      setPatterns(prevPatterns =>
        prevPatterns.map(pattern =>
          pattern._id === editingPattern._id ? response.data : pattern
        )
      );
      setEditingPattern(null); // Clear the editing state
    } catch (error) {
      console.error('Error updating pattern:', error);
    }
  };

    // Fetch patterns from the server when the component mounts
  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await axios.get('/api/patterns');
        setPatterns(response.data);// Set the fetched patterns in the state
      } catch (error) {
        console.error('Error fetching patterns:', error);
      }
    };

    fetchPatterns();
  }, []);

  const handleDelete = id => {
    console.log('Deleting pattern with ID:', id);
    if (!id) {
      console.error('Error: ID is undefined!');
      return;
    }

    axios
      .delete(`/api/patterns/${id}`)
      .then(response => {
        console.log(response);
        // Remove the deleted pattern from the state
        setPatterns(prevPatterns =>
          prevPatterns.filter(pattern => pattern._id !== id)
        );
      })
      .catch(error => console.error('Error deleting pattern:', error));
  };

 
  return (
    <div>
      <h1>Patterns</h1>
      <Link to='/create-pattern'>Create New Pattern</Link>

      {editingPattern ? (
        // Edit Form
        <form onSubmit={handleUpdateSubmit}>
          <h2>Edit Pattern</h2>
          <label>
            Name:
            <input
              type='text'
              value={editingPattern.name}
              onChange={e =>
                setEditingPattern({ ...editingPattern, name: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              value={editingPattern.description}
              onChange={e =>
                setEditingPattern({
                  ...editingPattern,
                  description: e.target.value
                })
              }
            />
          </label>
          <label>
            Fabric Type:
            <input
              type='text'
              value={editingPattern.fabricType}
              onChange={e =>
                setEditingPattern({
                  ...editingPattern,
                  fabricType: e.target.value
                })
              }
            />
          </label>
          <label>
            Notions:
            <input
              type='text'
              value={editingPattern.notions.join(', ')}
              onChange={e =>
                setEditingPattern({
                  ...editingPattern,
                  notions: e.target.value.split(',').map(item => item.trim())
                })
              }
            />
          </label>
          <label>
            Size:
            <input
              type='text'
              value={editingPattern.size}
              onChange={e =>
                setEditingPattern({ ...editingPattern, size: e.target.value })
              }
            />
          </label>
          <label>
            Difficulty Level:
            <input
              type='text'
              value={editingPattern.difficultyLevel}
              onChange={e =>
                setEditingPattern({
                  ...editingPattern,
                  difficultyLevel: e.target.value
                })
              }
            />
          </label>
          <label>
            Designer:
            <input
              type='text'
              value={editingPattern.designer}
              onChange={e =>
                setEditingPattern({
                  ...editingPattern,
                  designer: e.target.value
                })
              }
            />
          </label>
          <label>
            Brand:
            <input
              type='text'
              value={editingPattern.brand}
              onChange={e =>
                setEditingPattern({ ...editingPattern, brand: e.target.value })
              }
            />
          </label>
          <label>
            Format:
            <input
              type='text'
              value={editingPattern.format}
              onChange={e =>
                setEditingPattern({ ...editingPattern, format: e.target.value })
              }
            />
          </label>
          <button type='submit'>Save Changes</button>
          <button type='button' onClick={() => setEditingPattern(null)}>
            Cancel
          </button>
        </form>
      ) : (
        // Pattern List
        <ul>
          {patterns.map(pattern => (
            <li key={pattern._id}>
              <h2>{pattern.name}</h2>
              <p>{pattern.description}</p>
              {pattern.patternImage && (
                <img
                  src={pattern.patternImage}
                  alt={pattern.name}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                />
              )}
              <p>Fabric Type: {pattern.fabricType}</p>
              <p>Notions: {pattern.notions.join(', ')}</p>
              <p>Size range: {pattern.size}</p>
              <p>Difficulty Level: {pattern.difficultyLevel}</p>
              <p>Designer: {pattern.designer}</p>
              <p>Brand: {pattern.brand}</p>
              <p>Format: {pattern.format}</p>
              <button onClick={() => handleEditClick(pattern)}>Edit</button>
              <button onClick={() => handleDelete(pattern._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatternList;
