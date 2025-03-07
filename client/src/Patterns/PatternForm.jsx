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
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle input changes for text fields and form validation errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Handle image file changes
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'description', 'notions', 'size', 'designer', 'brand'];

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = `${field} is required`;
    });

    return newErrors;
  };

  // Upload image to the server and return image URL
  const uploadImage = async () => {
    if (!imageFile) return null;

    const imageData = new FormData();
    imageData.append('image', imageFile);

    try {
      setUploading(true);
      const response = await axios.post('/api/upload', imageData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.imageUrl) {
        return response.data.imageUrl;
      } else {
        setMessage('Image upload failed: No imageUrl in response.');
        return null;
      }
    } catch (error) {
      console.error('Image upload error:', error.response?.data || error.message);
      setMessage('Failed to upload image.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const uploadedImageUrl = await uploadImage();

      if (!uploadedImageUrl && imageFile) {
        setMessage('Image upload failed.');
        return;
      }

      const dataToSend = {
        ...formData,
        patternImage: uploadedImageUrl || formData.patternImage,
        notions: formData.notions.split(',').map((notion) => notion.trim()),
      };

      const response = await axios.post('/api/patterns', dataToSend);
      setMessage('Pattern created successfully!');
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
        <label>Upload Pattern Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p>Uploading...</p>}
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
      <button type="submit" disabled={isSubmitting || uploading}>
        {isSubmitting ? 'Submitting...' : 'Create Pattern'}
      </button>
      {message && <div style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
};

export default PatternForm;
