import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatternList = () => {
  const [patterns, setPatterns] = useState([]);

  const handleFetchPatterns = async () => {
    try {
      const data = await axios.get('/api/patterns'); // Fetch patterns
      setPatterns(data.data); // Update state with fetched patterns
    } catch (error) {
      console.error('Error fetching patterns:', error);
    }
  };

  return (
    <div>
      <h1>Patterns</h1>
      <button onClick={handleFetchPatterns}>Load Patterns</button> {/* Button to fetch patterns */}
      <ul>
        {patterns.map((pattern) => (
          <li key={pattern._id}>
            <Link to={`/patterns/${pattern._id}`}>{pattern.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatternList;