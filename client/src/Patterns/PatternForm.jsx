import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Box,
} from '@mui/material';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'description', 'notions', 'size', 'designer', 'brand'];

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = `${field} is required`;
    });

    return newErrors;
  };

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
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ color: 'rgb(31, 101, 66)' }}>
        Create New Pattern
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="upload-image"
              />
              <label htmlFor="upload-image">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: 'rgb(31, 101, 66)', // Gold color
                    color: '#', // Black text for contrast
                    '&:hover': {
                      backgroundColor: 'rgb(182, 152, 82)', // Darker gold on hover
                    },
                  }}
                >
                  Upload Pattern Image
                </Button>
              </label>
              {uploading && <CircularProgress size={24} style={{ marginLeft: 10 }} />}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Fabric Type</InputLabel>
                <Select
                  name="fabricType"
                  value={formData.fabricType}
                  onChange={handleChange}
                  label="Fabric Type"
                >
                  <MenuItem value="woven">Woven</MenuItem>
                  <MenuItem value="stretched">Stretched</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Notions (comma-separated)"
                name="notions"
                value={formData.notions}
                onChange={handleChange}
                error={!!errors.notions}
                helperText={errors.notions}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Size Range"
                name="size"
                value={formData.size}
                onChange={handleChange}
                error={!!errors.size}
                helperText={errors.size}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Difficulty Level</InputLabel>
                <Select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  label="Difficulty Level"
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designer"
                name="designer"
                value={formData.designer}
                onChange={handleChange}
                error={!!errors.designer}
                helperText={errors.designer}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                error={!!errors.brand}
                helperText={errors.brand}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Format</InputLabel>
                <Select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  label="Format"
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="paper">Paper</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgb(229, 229, 234)', // Light gray color
                    color: 'rgb(87, 27, 126)', // Purple text
                    '&:hover': {
                      backgroundColor: 'rgb(200, 200, 200)', // Darker gray on hover
                    },
                  }}
                  onClick={() => navigate('/patterns')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgb(31, 101, 66)', // Green color
                    color: 'rgb(229, 229, 234)', // Light gray text
                    '&:hover': {
                      backgroundColor: 'rgb(20, 80, 50)', // Darker green on hover
                    },
                  }}
                  disabled={isSubmitting || uploading}
                >
                  {isSubmitting ? 'Submitting...' : 'Create Pattern'}
                </Button>
              </Box>
            </Grid>
            {message && (
              <Grid item xs={12}>
                <Alert severity={message.includes('success') ? 'success' : 'error'}>
                  {message}
                </Alert>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PatternForm;