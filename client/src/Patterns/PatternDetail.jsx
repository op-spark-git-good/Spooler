import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatternDetail = () => {
  const { id } = useParams(); // Get the pattern ID from the URL
  const [pattern, setPattern] = useState(null);

  const handleFetchPattern = async () => {
    try {
      const response = await axios.get(`/api/patterns/${id}`); // Fetch pattern details
      setPattern(response.data); // Update state with fetched pattern
    } catch (error) {
      console.error('Error fetching pattern details:', error);
    }
  };

  // Fetch pattern details when the component mounts or the ID changes
  React.useEffect(() => {
    handleFetchPattern();
  }, [id]);

  if (!pattern) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pattern.name}</h1>
      <img src={pattern.patternImage} alt={pattern.name} />
      <p>{pattern.description}</p>
      <p><strong>Fabric Type:</strong> {pattern.fabricType}</p>
      <p><strong>Notions:</strong> {pattern.notions.join(', ')}</p>
      <p><strong>Size:</strong> {pattern.size}</p>
      <p><strong>Difficulty Level:</strong> {pattern.difficultyLevel}</p>
      <p><strong>Designer:</strong> {pattern.designer}</p>
      <p><strong>Brand:</strong> {pattern.brand}</p>
      <p><strong>Format:</strong> {pattern.format}</p>
    </div>
  );
};

export default PatternDetail;