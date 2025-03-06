import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatternDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    patternImage: '',
    fabricType: 'woven',
    notions: '',
    size: '',
    difficultyLevel: 'beginner',
    designer: '',
    brand: '',
    format: 'pdf',
  });

  useEffect(() => {
    const fetchPattern = async () => {
      try {
        const response = await axios.get(`api/patterns/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching pattern:', error);
      }
    };

    fetchPattern();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/patterns/${id}`, formData);
      navigate('/patterns'); // Redirect to the patterns list after update
    } catch (error) {
      console.error('Error updating pattern:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Pattern Image URL:</label>
        <input type="text" name="patternImage" value={formData.patternImage} onChange={handleChange} required />
      </div>
      <div>
        <label>Fabric Type:</label>
        <select name="fabricType" value={formData.fabricType} onChange={handleChange}>
          <option value="woven">Woven</option>
          <option value="stretched">Stretched</option>
        </select>
      </div>
      <div>
        <label>Notions (comma-separated):</label>
        <input type="text" name="notions" value={formData.notions} onChange={handleChange} required />
      </div>
      <div>
        <label>Size Range:</label>
        <input type="text" name="size" value={formData.size} onChange={handleChange} required />
      </div>
      <div>
        <label>Difficulty Level:</label>
        <select name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label>Designer:</label>
        <input type="text" name="designer" value={formData.designer} onChange={handleChange} required />
      </div>
      <div>
        <label>Brand:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
      </div>
      <div>
        <label>Format:</label>
        <select name="format" value={formData.format} onChange={handleChange}>
          <option value="pdf">PDF</option>
          <option value="paper">Paper</option>
        </select>
      </div>
      <button type="submit">Update Pattern</button>
    </form>
  );
};

export default PatternDetail;