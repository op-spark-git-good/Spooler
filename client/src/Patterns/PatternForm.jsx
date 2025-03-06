import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatternForm = () => {
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.patternImage) newErrors.patternImage = 'Pattern Image URL is required';
    if (!formData.notions) newErrors.notions = 'Notions are required';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.designer) newErrors.designer = 'Designer is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const dataToSend = {
        ...formData,
        notions: formData.notions.split(',').map((notion) => notion.trim()),
      };

      const response = await axios.post('/api/patterns', dataToSend);
      console.log('Pattern created:', response.data);
      setMessage('Pattern created successfully!');

      // Redirect to /patterns after successful submission
      navigate('/patterns');
    } catch (error) {
      console.error('Error creating pattern:', error);
      setMessage('Failed to create pattern.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
      </div>
      <div>
        <label>Pattern Image URL:</label>
        <input type="text" name="patternImage" value={formData.patternImage} onChange={handleChange} required />
        {errors.patternImage && <span style={{ color: 'red' }}>{errors.patternImage}</span>}
        {/* Image Preview */}
        {formData.patternImage && (
          <div style={{ marginTop: '10px' }}>
            <img
              src={formData.patternImage}
              alt="Pattern Preview"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              onError={(e) => {
                e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8T-ZfxCjkMy8wWU8vDAtWk-NaLbv_2zFCCA&s'; // Fallback image if URL is invalid
              }}
            />
          </div>
        )}
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
        {errors.notions && <span style={{ color: 'red' }}>{errors.notions}</span>}
      </div>
      <div>
        <label>Size Range:</label>
        <input type="text" name="size" value={formData.size} onChange={handleChange} required />
        {errors.size && <span style={{ color: 'red' }}>{errors.size}</span>}
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
        {errors.designer && <span style={{ color: 'red' }}>{errors.designer}</span>}
      </div>
      <div>
        <label>Brand:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
        {errors.brand && <span style={{ color: 'red' }}>{errors.brand}</span>}
      </div>
      <div>
        <label>Format:</label>
        <select name="format" value={formData.format} onChange={handleChange}>
          <option value="pdf">PDF</option>
          <option value="paper">Paper</option>
        </select>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create Pattern'}
      </button>
      {message && <div style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
};

export default PatternForm;