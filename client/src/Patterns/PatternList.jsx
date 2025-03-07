import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PatternList = () => {
  const [patterns, setPatterns] = useState([]);
  const [editingPattern, setEditingPattern] = useState(null);
  const [cloudinaryLoaded, setCloudinaryLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    script.onload = () => {
      setCloudinaryLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Cloudinary widget script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCloudinaryWidget = () => {
    return new Promise((resolve, reject) => {
      if (
        !cloudinaryLoaded ||
        !window.cloudinary ||
        !window.cloudinary.openUploadWidget
      ) {
        reject(new Error('Cloudinary widget not available'));
        return;
      }

      window.cloudinary.openUploadWidget(
        {
          cloudName: 'djfvmivqq',
          uploadPreset: 'ml_default',
          sources: ['local', 'url'],
          multiple: false
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            resolve(result.info.secure_url);
          } else {
            reject(error || 'Upload failed');
          }
        }
      );
    });
  };

  const handleImageUpload = async event => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      // Log the entire response object to inspect its structure
      console.log('Server response:', response);
  
      // Use the correct field 'imageUrl' from the server response
      if (response.data && response.data.imageUrl) {
        console.log('Image uploaded successfully:', response.data.imageUrl);
        setEditingPattern(prev => ({
          ...prev,
          patternImage: response.data.imageUrl // Update with the correct field
        }));
      } else {
        console.error('Error: Image URL not found in response.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEditClick = pattern => {
    // Ensure that notions is always an array, even if it's undefined
    setEditingPattern({
      ...pattern,
      notions: pattern.notions || [] // Initialize notions as an empty array if it's undefined
    });
  };

  const handleUpdateSubmit = async e => {
    e.preventDefault(); // Prevents the default form submission behavior

  if (!editingPattern || !editingPattern._id) {
    console.error('Error: No pattern selected for editing!');
    return;
  }

  try {
    const response = await axios.put(
      `/api/patterns/${editingPattern._id}`,
      editingPattern
    );
    console.log('Update successful:', response.data);

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

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await axios.get('/api/patterns');
        setPatterns(response.data);
      } catch (error) {
        console.error('Error fetching patterns:', error);
      }
    };

    fetchPatterns();
  }, []);

  const handleDelete = id => {
    if (!id) {
      console.error('Error: ID is undefined!');
      return;
    }

    axios
      .delete(`/api/patterns/${id}`)
      .then(response => {
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
              value={
                editingPattern.notions ? editingPattern.notions.join(', ') : ''
              }
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
          <label>
            Pattern Image:
            <input type='file' accept='image/*' onChange={handleImageUpload} />
            {editingPattern?.patternImage && (
              <img
                src={editingPattern.patternImage}
                alt='Pattern Preview'
                style={{ maxWidth: '100px', height: 'auto' }}
              />
            )}
          </label>

          <button type='submit'>Save Changes</button>
          <button type='button' onClick={() => setEditingPattern(null)}>
            Cancel
          </button>
        </form>
      ) : (
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
